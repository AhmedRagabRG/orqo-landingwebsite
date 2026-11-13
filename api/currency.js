// Vercel Function: select the fixed billing currency from the visitor's country.
// Vercel supplies x-vercel-ip-country as an ISO 3166-1 alpha-2 country code.
export function currencyForCountry(country) {
  switch ((country || '').trim().toUpperCase()) {
    case 'EG': return 'EGP';
    case 'SA': return 'SAR';
    default: return 'USD';
  }
}

export async function GET(request) {
  const country = request.headers.get('x-vercel-ip-country');
  return Response.json(
    { currency: currencyForCountry(country) },
    {
      headers: {
        'Cache-Control': 'private, no-store',
        Vary: 'X-Vercel-IP-Country',
      },
    },
  );
}
