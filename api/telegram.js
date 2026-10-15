// Vercel function: contact + waitlist forms POST {"text": "..."} here and it's relayed to Telegram.
// Env (Vercel → Settings → Environment Variables): TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
// The Docker/Coolify build does the same thing in nginx.conf.
export async function POST(request) {
  const { TELEGRAM_BOT_TOKEN: token, TELEGRAM_CHAT_ID: chatId } = process.env;
  if (!token || !chatId) return new Response('Telegram not configured', { status: 503 });

  let text;
  try { ({ text } = await request.json()); } catch { /* falls through to 400 */ }
  if (typeof text !== 'string' || !text.trim()) return new Response('Bad request', { status: 400 });

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text.slice(0, 4000) }),
  });
  return new Response(r.ok ? 'ok' : 'Telegram error', { status: r.ok ? 200 : 502 });
}
