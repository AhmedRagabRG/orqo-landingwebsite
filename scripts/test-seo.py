#!/usr/bin/env python3
"""Validate generated HTML, route inventory and sitemap with Python's standard library.
Run after npm run build. This deliberately checks rendered output, not template strings.
"""
import json
import re
import unittest
from collections import Counter, deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
from xml.etree import ElementTree as ET

ORIGIN = 'https://www.orqo.site'
DIST = Path(__file__).resolve().parents[1] / 'dist'
ROOT = DIST.parent

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.meta, self.canonicals, self.alternates, self.anchors, self.images = {}, [], {}, [], []
        self.ids, self.headings, self.jsonld, self.styles, self.scripts = [], [], [], [], []
        self.title, self.lang, self.direction, self.stack, self.schema = '', '', '', [], ''
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.stack.append(tag)
        if 'id' in a: self.ids.append(a['id'])
        if tag == 'html': self.lang, self.direction = a.get('lang'), a.get('dir')
        if tag == 'meta': self.meta[a.get('name', a.get('property', ''))] = a.get('content', '')
        if tag == 'link':
            if a.get('rel') == 'canonical': self.canonicals.append(a.get('href'))
            if a.get('rel') == 'alternate' and a.get('hreflang'): self.alternates[a['hreflang']] = a.get('href')
            if a.get('rel') == 'stylesheet': self.styles.append(a['href'])
        if tag == 'a' and a.get('href'): self.anchors.append(a['href'])
        if tag == 'img': self.images.append(a)
        if re.fullmatch(r'h[1-6]', tag): self.headings.append(int(tag[1]))
        if tag == 'script':
            if a.get('src'): self.scripts.append(a['src'])
            if a.get('type') == 'application/ld+json': self.schema = 'reading'
    def handle_endtag(self, tag):
        if tag == 'script' and self.schema:
            self.jsonld.append(json.loads(self.schema.removeprefix('reading')))
            self.schema = ''
        if tag in self.stack:
            i = len(self.stack) - 1 - self.stack[::-1].index(tag)
            self.stack = self.stack[:i]
    def handle_data(self, data):
        if self.stack and self.stack[-1] == 'title': self.title += data
        if self.schema: self.schema += data


def route_for(file):
    relative = file.relative_to(DIST).as_posix()
    return '/' + relative.removesuffix('index.html').rstrip('/') if relative != 'index.html' else '/'

PAGES = {route_for(p): Page(p) for p in DIST.rglob('index.html') if p.relative_to(DIST).parts[0] != 'en'}

def metadata(file):
    text = file.read_text().split('---', 2)[1]
    return {k: json.loads(v) for k, v in (line.split(': ', 1) for line in text.strip().splitlines())}

CONTENT = [metadata(p) for p in (ROOT / 'src/content/marketing').rglob('*.md')]

class SeoTests(unittest.TestCase):
    def test_route_inventory_and_no_drafts(self):
        expected = {'/', '/pricing', '/contact', '/privacy', '/terms', '/ar', '/ar/pricing', '/ar/contact', '/ar/privacy', '/ar/terms'}
        for lang in ['en', 'ar']:
            prefix = '/ar' if lang == 'ar' else ''
            expected.update(prefix + '/' + k for k in ['features', 'solutions', 'compare', 'alternatives', 'blog'])
        for d in CONTENT:
            route = ('/ar' if d['lang'] == 'ar' else '') + '/' + d['kind'] + '/' + d['slug']
            if d.get('draft'): self.assertNotIn(route, PAGES)
            else: expected.add(route)
        self.assertEqual(set(PAGES), expected)

    def test_unique_complete_metadata(self):
        for field in ['title', 'description']:
            values = [p.title if field == 'title' else p.meta.get(field) for p in PAGES.values()]
            self.assertEqual(len(values), len(set(values)), f'Duplicate {field}')
        for route, p in PAGES.items():
            with self.subTest(route=route):
                self.assertTrue(p.title.strip())
                self.assertTrue(p.meta.get('description'))
                self.assertEqual(p.canonicals, [ORIGIN + route])
                self.assertEqual(p.meta.get('og:url'), ORIGIN + route)
                for name in ['og:title', 'og:description', 'og:image', 'og:image:alt', 'twitter:title', 'twitter:description', 'twitter:image', 'og:locale']:
                    self.assertTrue(p.meta.get(name), name)
                self.assertEqual(p.meta['og:title'], p.title)
                self.assertEqual(p.meta['twitter:description'], p.meta['description'])
                self.assertEqual(p.meta.get('twitter:card'), 'summary_large_image')
                self.assertNotIn('noindex', p.meta.get('robots', ''))
                self.assertIn('index, follow', p.meta.get('robots', ''))
                self.assertEqual(p.headings.count(1), 1)
                self.assertEqual(len(p.ids), len(set(p.ids)), 'Duplicate element IDs')
                for previous, current in zip(p.headings, p.headings[1:]):
                    self.assertLessEqual(current, previous + 1, 'Skipped heading level')

    def test_localization_and_reciprocity(self):
        for route, p in PAGES.items():
            with self.subTest(route=route):
                ar = route == '/ar' or route.startswith('/ar/')
                english = route[3:] or '/' if ar else route
                arabic = '/ar' if english == '/' else '/ar' + english
                expected = {'en': ORIGIN + english, 'ar': ORIGIN + arabic, 'x-default': ORIGIN + english}
                self.assertEqual(p.alternates, expected)
                self.assertEqual(p.lang, 'ar' if ar else 'en')
                self.assertEqual(p.direction, 'rtl' if ar else 'ltr')
                self.assertEqual(p.meta['og:locale'], 'ar_EG' if ar else 'en_US')
                self.assertEqual(p.meta['og:locale:alternate'], 'en_US' if ar else 'ar_EG')
                for url in expected.values():
                    target = PAGES[urlsplit(url).path]
                    self.assertEqual(target.alternates, expected)

    def test_internal_links_assets_and_discoverability(self):
        graph = {}
        for route, p in PAGES.items():
            graph[route] = set()
            for link in p.anchors:
                if link.startswith(('mailto:', 'tel:')): continue
                target = urlsplit(urljoin(ORIGIN + route, link))
                if target.netloc != 'www.orqo.site': continue
                path = unquote(target.path)
                with self.subTest(source=route, link=link):
                    self.assertIn(path, PAGES, 'Broken or noncanonical internal page link')
                    if target.fragment: self.assertIn(unquote(target.fragment), PAGES[path].ids, 'Broken fragment')
                if path in PAGES: graph[route].add(path)
            for image in p.images:
                self.assertIn('alt', image)
                self.assertTrue(image.get('width') and image.get('height'), f'Missing image dimensions on {route}')
                if image['src'].startswith('/'): self.assertTrue((DIST / image['src'].lstrip('/')).is_file())
            for asset in p.styles + p.scripts:
                if asset.startswith('/'): self.assertTrue((DIST / asset.lstrip('/')).is_file())
        seen, queue = set(), deque(['/'])
        while queue:
            route = queue.popleft()
            if route in seen: continue
            seen.add(route)
            queue.extend(graph[route] - seen)
        self.assertEqual(seen, set(PAGES), 'Orphan pages')

    def test_structured_data(self):
        for route, p in PAGES.items():
            with self.subTest(route=route):
                self.assertEqual(len(p.jsonld), 1)
                graph = p.jsonld[0]['@graph']
                types = [n['@type'] for n in graph]
                self.assertIn('Organization', types)
                self.assertIn('WebSite', types)
                self.assertNotIn('FAQPage', types)
                for node in graph:
                    self.assertNotIn('aggregateRating', node)
                    self.assertNotIn('review', node)
                    if node['@type'] == 'BreadcrumbList':
                        items = node['itemListElement']
                        self.assertEqual([i['position'] for i in items], list(range(1, len(items) + 1)))
                        self.assertEqual(items[-1]['item'], ORIGIN + route)
                    if node['@type'] == 'BlogPosting':
                        self.assertEqual(node['dateModified'], p.meta['article:modified_time'])
                        self.assertEqual(node['datePublished'], p.meta['article:published_time'])
                        self.assertLessEqual(node['datePublished'], node['dateModified'])
                        self.assertTrue(node['author']['name'])
                        self.assertEqual(node['mainEntityOfPage'], ORIGIN + route)
                if re.match(r'^/(ar/)?blog/.+', route):
                    self.assertIn('BlogPosting', types)
                    self.assertEqual(p.meta['og:type'], 'article')
                if re.match(r'^/(ar/)?(features|solutions|compare|alternatives|blog)', route): self.assertIn('BreadcrumbList', types)

    def test_sitemap_matches_canonical_inventory(self):
        ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9', 'x': 'http://www.w3.org/1999/xhtml'}
        index = ET.parse(DIST / 'sitemap-index.xml')
        entries = []
        for loc in index.findall('.//s:loc', ns):
            entries.extend(ET.parse(DIST / urlsplit(loc.text).path.lstrip('/')).getroot())
        urls = [u.find('s:loc', ns).text for u in entries]
        self.assertEqual(set(urls), {ORIGIN + p for p in PAGES})
        self.assertEqual(len(urls), len(set(urls)))
        for item in entries:
            route = urlsplit(item.find('s:loc', ns).text).path
            modified = item.find('s:lastmod', ns)
            if modified is not None: self.assertTrue(modified.text.startswith(PAGES[route].meta['article:modified_time']))
            links = {n.attrib['hreflang']: n.attrib['href'] for n in item.findall('x:link', ns)}
            self.assertEqual(links, {k: v for k, v in PAGES[route].alternates.items() if k != 'x-default'})

    def test_nonindexable_and_redirect_pages(self):
        missing = Page(DIST / '404.html')
        self.assertIn('noindex', missing.meta['robots'])
        self.assertEqual(missing.alternates, {})
        rules = json.loads((ROOT / 'vercel.json').read_text())
        self.assertFalse(rules['trailingSlash'])
        self.assertIn({'source': '/en/:path*', 'destination': '/:path*', 'permanent': True}, rules['redirects'])
        for file in (DIST / 'en').rglob('index.html'):
            self.assertIn('http-equiv="refresh"', file.read_text())
        robots = (DIST / 'robots.txt').read_text()
        self.assertIn('Allow: /', robots)
        self.assertIn('Sitemap: ' + ORIGIN + '/sitemap-index.xml', robots)
        self.assertNotIn('Disallow: /\n', robots)

    def test_editorial_evidence_and_related_links(self):
        for d in CONTENT:
            if d.get('draft'): continue
            with self.subTest(page=d['slug'], lang=d['lang']):
                if d['kind'] in ['compare', 'alternatives']:
                    self.assertTrue(d.get('reviewed'))
                    self.assertGreater(len(d.get('sources', [])), 0)
                for related in d['related']:
                    self.assertIn(('/ar' if d['lang'] == 'ar' else '') + related, PAGES)
                self.assertGreaterEqual(len(d['faq']), 2)
                partner = [e for e in CONTENT if e['slug'] == d['slug'] and e['kind'] == d['kind'] and e['lang'] != d['lang'] and not e.get('draft')]
                self.assertEqual(len(partner), 1)

if __name__ == '__main__':
    if not PAGES: raise SystemExit('Build the site first: npm run build')
    print(f'Checking {len(PAGES)} indexable HTML pages and {len(CONTENT)} content entries', flush=True)
    unittest.main(verbosity=2)
