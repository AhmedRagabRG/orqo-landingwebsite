/* ORQO landing — interactions. No dependencies. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };
  function inView(el, cb, opts) {
    if (!('IntersectionObserver' in window)) { cb(true); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { cb(e.isIntersecting, e); });
    }, opts || { threshold: 0.25 }).observe(el);
  }

  /* reduced motion: stop SMIL dots in the hero */
  if (reduce) { $$('.flow-dots').forEach(function (g) { g.remove(); }); }

  /* ---------- header ---------- */
  var head = $('.site-head');
  var onScroll = function () { head.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var menuBtn = $('.menu-btn'), mnav = $('#mobile-nav');
  function setMenu(open) {
    mnav.hidden = !open;
    head.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
    menuBtn.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
  }
  menuBtn.addEventListener('click', function () { setMenu(mnav.hidden); });
  $$('a', mnav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mnav.hidden) { setMenu(false); menuBtn.focus(); } });

  /* ---------- review marks ---------- */
  var rtg = $('.review-toggle');
  if (rtg) {
    var setReview = function (on) {
      document.body.classList.toggle('review-on', on);
      rtg.setAttribute('aria-pressed', String(on));
      store.set('orqo-review', on ? '1' : '0');
    };
    if (store.get('orqo-review') === '0') setReview(false);
    rtg.addEventListener('click', function () { setReview(!document.body.classList.contains('review-on')); });
  }

  /* ---------- current page in nav ---------- */
  var page = document.body.dataset.page;
  if (page) $$('[data-page="' + page + '"]').forEach(function (a) { a.setAttribute('aria-current', 'page'); });

  /* ---------- billing cycle ---------- */
  $$('.billing-toggle').forEach(function (group) {
    $$('button', group).forEach(function (b) {
      b.addEventListener('click', function () {
        var cyc = b.dataset.cycle, key = cyc === 'yearly' ? 'y' : 'm';
        $$('.billing-toggle button').forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.cycle === cyc)); });
        $$('[data-m][data-y]').forEach(function (el) { el.textContent = el.dataset[key]; });
        document.body.dataset.cycle = cyc;
      });
    });
  });

  /* ---------- comparison: one plan at a time on phones ---------- */
  var cmp = $('.cmp');
  if (cmp) $$('.cmp-switch button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.cmp-switch button').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
      cmp.dataset.show = b.dataset.plan;
    });
  });

  /* ---------- copy buttons ---------- */
  $$('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.dataset.copy, done = function () { b.classList.add('copied'); setTimeout(function () { b.classList.remove('copied'); }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { selectNear(b); });
      else selectNear(b);
    });
  });
  function selectNear(b) {
    var val = b.closest('.chan') && b.closest('.chan').querySelector('.chan-val');
    if (!val) return;
    var r = document.createRange(); r.selectNodeContents(val);
    var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
  }

  /* ---------- contact form (not connected yet) ---------- */
  var form = $('#contact-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = $('.cf-status', form), btn = $('button[type="submit"]', form);
    var bad = $$('[required]', form).filter(function (f) { return !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value)); });
    $$('[required]', form).forEach(function (f) { f.toggleAttribute('aria-invalid', bad.indexOf(f) > -1); });
    status.hidden = false;
    if (bad.length) { status.className = 'cf-status is-err'; status.textContent = 'أكمل الاسم والبريد الإلكتروني والرسالة.'; bad[0].focus(); return; }
    var endpoint = form.dataset.endpoint;
    if (!endpoint) {
      status.className = 'cf-status';
      status.textContent = 'نموذج التواصل غير متصل بعد. راسلنا مباشرة على hello@orqo.site';
      return;
    }
    var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });
    data.page = location.href;
    btn.disabled = true;
    status.className = 'cf-status'; status.textContent = 'جارٍ الإرسال…';
    fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        status.textContent = 'وصلتنا رسالتك. سنرد عليك قريبًا.';
        form.reset();
      })
      .catch(function () {
        status.className = 'cf-status is-err';
        status.textContent = 'لم تُرسل الرسالة. حاول مرة أخرى أو راسلنا على hello@orqo.site';
      })
      .finally(function () { btn.disabled = false; });
  });

  /* ---------- sections that animate once in view ---------- */
  if (!reduce) ['.handoff', '.profile', '.cod-sec'].forEach(function (sel) {
    var el = $(sel); if (!el) return;
    inView(el, function (vis) { if (vis) el.classList.add('is-in'); else if (sel === '.cod-sec') el.classList.remove('is-in'); }, { threshold: 0.3 });
  });

  /* ---------- legal pages: highlight current section in the contents ---------- */
  var tocLinks = $$('.legal-toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove('on'); a.removeAttribute('aria-current'); });
        var a = byId[e.target.id]; if (a) { a.classList.add('on'); a.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    $$('.legal-body section[id], .legal-prose h2[id]').forEach(function (sec) { tio.observe(sec); });
  }

  /* ---------- campaigns: numbered steps drive the composer window ---------- */
  var cbGrid = $('.cb-grid');
  if (cbGrid) {
    var cbBtns = $$('.cb-step', cbGrid), cbStep = 1, cbTimer = null, cbTouched = false;
    var cbSet = function (n) {
      cbStep = n; cbGrid.dataset.step = String(n);
      cbBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.go) === n)); });
    };
    cbBtns.forEach(function (b) {
      b.addEventListener('click', function () { cbTouched = true; clearInterval(cbTimer); cbSet(Number(b.dataset.go)); });
    });
    if (!reduce) inView(cbGrid, function (vis) {
      clearInterval(cbTimer);
      if (vis && !cbTouched) cbTimer = setInterval(function () { cbSet(cbStep >= 4 ? 1 : cbStep + 1); }, 4200);
    }, { threshold: 0.4 });
  }

  /* ---------- tabs (FAQ topics) ---------- */
  $$('[data-tabs]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, j = null;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') j = (i + 1) % n;
        else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') j = (i - 1 + n) % n;
        else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = n - 1;
        if (j !== null) { e.preventDefault(); select(tabs[j], true); }
      });
    });
  });

  /* ---------- reveal-on-scroll (closing chat) ---------- */
  $$('[data-reveal]').forEach(function (el) {
    if (reduce) { el.classList.add('is-in'); return; }
    inView(el, function (vis) { if (vis) el.classList.add('is-in'); }, { threshold: 0.35 });
  });

  /* ---------- problem: before / after ---------- */
  (function () {
  if (!$('#problem .board')) return;
  var problem = $('#problem'), board = $('.board', problem), touched = false;
  function setMode(mode) {
    problem.dataset.mode = mode; board.dataset.mode = mode;
    $$('.switch-btn', problem).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === mode)); });
    $('[data-list="before"]', problem).hidden = mode !== 'before';
    $('[data-list="after"]', problem).hidden = mode !== 'after';
    var eb = $('[data-before]', problem); if (eb) eb.textContent = mode === 'before' ? 'قبل ORQO' : 'مع ORQO';
  }
  $$('.switch-btn', problem).forEach(function (b) {
    b.addEventListener('click', function () { touched = true; setMode(b.dataset.mode); });
  });
  setMode('before');
  if (!reduce) {
    var played = false;
    inView(board, function (vis) {
      if (vis && !played) { played = true; setTimeout(function () { if (!touched) setMode('after'); }, 1800); }
    }, { threshold: 0.6 });
  }
  })();

  /* ---------- AI journey ---------- */
  (function () {
  if (!$('#js-thread')) return;
  var NOTE = '<svg aria-hidden="true"><use href="#i-note"/></svg>';
  var STEPS = {
    1: [
      { t: 'sys', x: 'بدأت المحادثة · واتساب' },
      { t: 'sys', x: 'تم تعيين المحادثة إلى ليلى · وكيل ذكي' },
      { t: 'in', x: 'بكام الاستشارة؟' },
      { t: 'ai', x: 'الاستشارة بـ500 جنيه ومدتها 30 دقيقة. تحبي نحجزلك ميعاد الأسبوع ده؟' }
    ],
    2: [
      { t: 'in', x: 'أيوه، الخميس بعد الساعة 6 مساءً.' },
      { t: 'in', x: 'أنا منى عادل، ورقمي ‎+20 000 000 0000 (رقم تجريبي).' },
      { t: 'note', x: 'عميلة مهتمة بحجز استشارة. تم إبلاغها أن السعر 500 جنيه، وتفضل يوم الخميس بعد الساعة 6 مساءً.' },
      { t: 'sys', x: 'ليلى نقلت منى عادل إلى مرحلة Qualified' }
    ],
    3: [
      { t: 'in', x: 'ممكن حد من الفريق يكلمني؟ عندي طلب خاص.' },
      { t: 'ai', x: 'أكيد، هحوّلك لحد من الفريق يساعدك.' },
      { t: 'sys', x: 'النظام سلّم هذه المحادثة إلى وكيل بشري' },
      { t: 'sys', x: 'النظام عيّن هذه المحادثة إلى Ahmed Ragab' }
    ],
    4: [
      { t: 'sys', x: 'أنشأ Ahmed Ragab ملخصًا للمحادثة' },
      { t: 'sum', x: 'منى عادل مهتمة بحجز استشارة. تم إبلاغها أن سعر الاستشارة 500 جنيه ومدتها 30 دقيقة. تفضل يوم الخميس بعد الساعة 6 مساءً، وطلبت التحدث مع أحد أعضاء الفريق بخصوص طلب خاص.' }
    ],
    5: [
      { t: 'hu', x: 'تمام يا منى، متاح الخميس الساعة 6:30. مناسب؟' },
      { t: 'in', x: 'تمام، مناسب جدًا. أشوفكم الخميس.' },
      { t: 'sys', x: 'نُقلت منى عادل إلى مرحلة Booked' }
    ]
  };
  var thread = $('#js-thread'), jstage = $('.jstage'), assignee = $('.js-assignee'), stageChip = $('.js-stage');
  var cur = 0, runId = 0;

  function el(m) {
    var d = document.createElement('div');
    if (m.t === 'sys') { d.className = 'msg msg-sys'; d.textContent = m.x; }
    else if (m.t === 'in') { d.className = 'msg msg-in'; d.textContent = m.x; }
    else if (m.t === 'ai') { d.className = 'msg msg-out'; d.innerHTML = '<span class="msg-by">ليلى · وكيل ذكي</span>'; d.appendChild(document.createTextNode(m.x)); }
    else if (m.t === 'hu') { d.className = 'msg msg-out'; d.innerHTML = '<span class="msg-by" lang="en">Ahmed Ragab</span>'; d.appendChild(document.createTextNode(m.x)); }
    else if (m.t === 'note') { d.className = 'msg msg-note'; d.innerHTML = '<b>' + NOTE + 'تعليق داخلي · ليلى</b>'; d.appendChild(document.createTextNode(m.x)); }
    else if (m.t === 'sum') { d.className = 'msg msg-sum'; d.innerHTML = '<b>' + NOTE + 'ملخص المحادثة</b>'; d.appendChild(document.createTextNode(m.x)); }
    return d;
  }
  function flash(node) { node.classList.remove('flash'); void node.offsetWidth; node.classList.add('flash'); setTimeout(function () { node.classList.remove('flash'); }, 1400); }
  function setMeta(n, animate) {
    var who = n >= 3 ? 'human' : 'ai';
    if (assignee.dataset.who !== who) { assignee.dataset.who = who; if (animate) flash(assignee); }
    var st = n >= 5 ? 'b' : n >= 2 ? 'q' : 'new';
    if (stageChip.dataset.stage !== st) { stageChip.dataset.stage = st; if (animate) flash(stageChip); }
    $$('.js-profile [data-f]').forEach(function (f) {
      var set = n >= 2;
      var was = f.classList.contains('is-set');
      f.classList.toggle('is-set', set);
      if (set && !was && animate) { f.classList.add('is-new'); setTimeout(function () { f.classList.remove('is-new'); }, 1800); }
    });
  }
  function renderUpTo(n) {
    thread.innerHTML = '';
    for (var i = 1; i <= n; i++) STEPS[i].forEach(function (m) { thread.appendChild(el(m)); });
  }
  function playStep(n) {
    var id = ++runId, list = STEPS[n], i = 0;
    function next() {
      if (id !== runId || i >= list.length) return;
      var m = list[i++];
      var out = m.t === 'ai' || m.t === 'hu';
      if (out) {
        var ty = document.createElement('div'); ty.className = 'typing'; ty.innerHTML = '<i></i><i></i><i></i>';
        thread.appendChild(ty);
        setTimeout(function () { if (id !== runId) return; ty.remove(); var d = el(m); d.classList.add('enter'); thread.appendChild(d); setTimeout(next, 520); }, 900);
      } else {
        var d = el(m); d.classList.add('enter'); thread.appendChild(d);
        if (m.t === 'note' || (n === 2 && i === 2)) setMeta(n, true);
        setTimeout(next, m.t === 'sys' ? 380 : 620);
      }
    }
    next();
  }
  function goStep(n, fromScroll) {
    n = Math.max(1, Math.min(5, n));
    if (n === cur) return;
    var forwardOne = n === cur + 1 && !reduce;
    runId++;
    if (forwardOne && cur > 0) {
      renderUpTo(cur);
      if (n !== 2) setMeta(n, true);
      playStep(n);
    } else {
      renderUpTo(n); setMeta(n, false);
    }
    cur = n;
    jstage.dataset.step = String(n);
    $$('.jstep').forEach(function (s) { s.classList.toggle('is-active', Number(s.dataset.step) === n); });
    $$('.jdots button').forEach(function (b) { b.setAttribute('aria-selected', String(Number(b.dataset.go) === n)); });
    $('.jprev').disabled = n === 1; $('.jnext').disabled = n === 5;
    if (!fromScroll && isDesktop()) {
      var target = $('.jstep[data-step="' + n + '"]');
      if (target) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }
  }
  function isDesktop() { return window.matchMedia('(min-width: 901px)').matches; }
  goStep(1, true);
  $$('.jdots button').forEach(function (b) { b.addEventListener('click', function () { goStep(Number(b.dataset.go)); }); });
  var jTouched = false, jTimer = null;
  function jStop() { jTouched = true; clearInterval(jTimer); }
  $$('.jdots button').forEach(function (b) { b.addEventListener('click', jStop); });
  $('.jprev').addEventListener('click', function () { jStop(); goStep(cur - 1); });
  $('.jnext').addEventListener('click', function () { jStop(); goStep(cur + 1); });
  if (!reduce && $('.ai-stage')) {
    inView($('.ai-stage'), function (vis) {
      clearInterval(jTimer);
      if (vis && !jTouched) jTimer = setInterval(function () { goStep(cur >= 5 ? 1 : cur + 1); }, 6500);
    }, { threshold: 0.45 });
  }
  if ('IntersectionObserver' in window) {
    var jio = new IntersectionObserver(function (entries) {
      if (!isDesktop()) return;
      entries.forEach(function (e) { if (e.isIntersecting) goStep(Number(e.target.dataset.step), true); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    $$('.jstep').forEach(function (s) { jio.observe(s); });
  }
  })();

  /* ---------- automation run ---------- */
  var flow = $('.flow');
  if (flow && !reduce) inView(flow, function (vis) { flow.classList.toggle('is-running', vis); }, { threshold: 0.35 });

  /* ---------- pipeline ---------- */
  (function () {
  if (!$('.pboard')) return;
  var WA = '<svg aria-hidden="true"><use href="#i-wa"/></svg>', IG = '<svg aria-hidden="true"><use href="#i-ig"/></svg>', MS = '<svg aria-hidden="true"><use href="#i-ms"/></svg>';
  var ICON = { wa: WA, ig: IG, ms: MS };
  var IND = {
    clinic: { cols: ['استفسار جديد', 'مؤهَّل', 'موعد محجوز'], hero: ['م', 'منى عادل', 'استشارة', 'wa', 'عميل مهتم'],
      ghosts: [[['أ', 'أحمد سامي', 'كشف'], ['د', 'دعاء شريف', 'متابعة']], [['ح', 'حسام كمال', 'استشارة'], ['ع', 'عمر نبيل', 'كشف']], [['م', 'مريم طارق', 'استشارة']]] },
    edu: { cols: ['عميل جديد', 'مهتم', 'تم التسجيل'], hero: ['ي', 'يوسف علي', 'دبلومة التسويق الرقمي', 'ig', 'الدفعة القادمة'],
      ghosts: [[['س', 'سلمى حسن', 'كورس لغة'], ['ن', 'نور خالد', 'ورشة تصميم']], [['م', 'محمود رامي', 'دبلومة برمجة']], [['د', 'دعاء شريف', 'كورس لغة'], ['ع', 'عمر نبيل', 'ورشة تصميم']]] },
    estate: { cols: ['استفسار', 'مؤهَّل', 'معاينة', 'تم التعاقد'], hero: ['ي', 'ياسمين فؤاد', 'شقة 3 غرف', 'wa', 'ميزانية محددة'],
      ghosts: [[['ح', 'حسام كمال', 'فيلا']], [['أ', 'أحمد سامي', 'مكتب إداري']], [['م', 'مريم طارق', 'شقة غرفتين']], [['ك', 'كريم منصور', 'محل تجاري']]] },
    travel: { cols: ['استفسار', 'عرض سعر', 'تم الحجز'], hero: ['ك', 'كريم منصور', 'باقة لشخصين', 'ms', 'سفر الشهر القادم'],
      ghosts: [[['س', 'سلمى حسن', 'رحلة عائلية'], ['م', 'محمود رامي', 'عمرة']], [['ن', 'نور خالد', 'باقة شتوية']], [['د', 'دعاء شريف', 'رحلة عائلية']]] }
  };
  var pboard = $('.pboard'), pTimer = null, pVisible = false, pIndex = 0, pInd = 'clinic';
  function cardHTML(g) { return '<span class="pc-av">' + g[0] + '</span><span class="pc-main"><b>' + g[1] + '</b><small>' + g[2] + '</small></span>'; }
  function buildBoard(key) {
    var d = IND[key]; pInd = key; pboard.dataset.ind = key; pboard.innerHTML = '';
    d.cols.forEach(function (name, ci) {
      var col = document.createElement('div');
      col.className = 'pcol' + (ci === d.cols.length - 1 ? ' pcol-win' : '');
      var count = (d.ghosts[ci] || []).length + (ci === 0 ? 1 : 0);
      col.innerHTML = '<p class="pcol-h"><span>' + name + '</span><i>' + count + '</i></p>';
      (d.ghosts[ci] || []).forEach(function (g) { var c = document.createElement('div'); c.className = 'pcard ghost'; c.innerHTML = cardHTML(g); col.appendChild(c); });
      pboard.appendChild(col);
    });
    var h = d.hero, hero = document.createElement('div');
    hero.className = 'pcard is-hero'; hero.id = 'hero-card';
    hero.innerHTML = cardHTML(h) + '<span class="pc-ch ' + h[3] + '">' + ICON[h[3]] + '</span><span class="pc-tag">' + h[4] + '</span>';
    pIndex = reduce ? d.cols.length - 1 : 0;
    placeHero(hero, pIndex, false);
    updateCounts();
  }
  function updateCounts() {
    $$('.pcol', pboard).forEach(function (c) { $('.pcol-h i', c).textContent = $$('.pcard', c).length; });
  }
  function placeHero(hero, idx, animate) {
    var col = $$('.pcol', pboard)[idx];
    var first = hero.isConnected ? hero.getBoundingClientRect() : null;
    col.insertBefore(hero, col.children[1] || null);
    if (animate && first && !reduce) {
      var last = hero.getBoundingClientRect();
      hero.animate([{ transform: 'translate(' + (first.left - last.left) + 'px,' + (first.top - last.top) + 'px) rotate(-2deg)' }, { transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.3,.8,.2,1)' });
    }
    updateCounts();
  }
  function tick() {
    var hero = $('#hero-card'), n = IND[pInd].cols.length;
    pIndex = pIndex + 1 >= n ? 0 : pIndex + 1;
    placeHero(hero, pIndex, true);
    schedule(pIndex === n - 1 ? 3200 : 2000);
  }
  function schedule(ms) { clearTimeout(pTimer); if (pVisible && !reduce) pTimer = setTimeout(tick, ms); }
  $$('.pipe-tabs button').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.pipe-tabs button').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
      buildBoard(b.dataset.ind); schedule(1400);
    });
  });
  buildBoard('clinic');
  inView(pboard, function (vis) { pVisible = vis; if (vis) schedule(900); else clearTimeout(pTimer); }, { threshold: 0.4 });
  })();

  /* ---------- report bars (illustrative data) ---------- */
  var bars = $('#rep-bars');
  if (bars) {
    var vals = [62, 71, 58, 84, 90, 77, 69, 95, 88, 102, 97, 110, 93, 118];
    var W = 560, H = 200, L = 34, R = 8, T = 14, B = 26, max = 120;
    var pw = W - L - R, ph = H - T - B, step = pw / vals.length, bw = Math.min(22, step - 8);
    var svg = '';
    [0, 40, 80, 120].forEach(function (v) {
      var y = T + ph - (v / max) * ph;
      svg += '<line class="grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + y + '" y2="' + y + '"/>';
      svg += '<text class="ax" x="' + (L - 8) + '" y="' + (y + 4) + '" text-anchor="end">' + v + '</text>';
    });
    vals.forEach(function (v, i) {
      var h = (v / max) * ph, x = L + i * step + (step - bw) / 2, y = T + ph - h, last = i === vals.length - 1;
      var r = Math.min(4, bw / 2);
      var d = 'M' + x + ',' + (T + ph) + 'V' + (y + r) + 'Q' + x + ',' + y + ' ' + (x + r) + ',' + y + 'H' + (x + bw - r) + 'Q' + (x + bw) + ',' + y + ' ' + (x + bw) + ',' + (y + r) + 'V' + (T + ph) + 'Z';
      svg += '<path class="bar' + (last ? ' last' : '') + '" d="' + d + '"><title>' + (17 + i) + ' سبتمبر: ' + v + ' محادثة</title></path>';
      if (i % 2 === 1 || last) svg += '<text class="ax" x="' + (x + bw / 2) + '" y="' + (H - 6) + '" text-anchor="middle">' + (17 + i) + '/9</text>';
      if (last) svg += '<text class="val" x="' + (x + bw / 2) + '" y="' + (y - 6) + '" text-anchor="middle">' + v + '</text>';
    });
    bars.setAttribute('direction', 'ltr');
    bars.innerHTML = svg;
  }
})();
