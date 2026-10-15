// Vercel function: contact + waitlist forms POST {"text": "..."} here and it's relayed to Telegram.
// Env (Vercel → Settings → Environment Variables): TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID.
// The Docker/Coolify build does the same thing in nginx.conf.
export async function POST(request) {
  // Pull the token out of whatever was pasted (quotes, "bot" prefix, even a full api.telegram.org URL).
  const raw = process.env.TELEGRAM_BOT_TOKEN || '';
  const token = (raw.match(/\d{5,}:[\w-]{30,}/) || [])[0];
  const chatId = (process.env.TELEGRAM_CHAT_ID || '').trim().replace(/^["']|["']$/g, '');
  if (!token) return new Response(`TELEGRAM_BOT_TOKEN is not a bot token (got ${raw.length} chars; expected 123456789:AA…)`, { status: 503 });
  if (!chatId) return new Response('TELEGRAM_CHAT_ID is empty', { status: 503 });

  let text;
  try { ({ text } = await request.json()); } catch { /* falls through to 400 */ }
  if (typeof text !== 'string' || !text.trim()) return new Response('Bad request', { status: 400 });

  const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text.slice(0, 4000) }),
  });
  if (r.ok) return new Response('ok');
  const { description } = await r.json().catch(() => ({}));
  const hint = r.status === 404 ? ` — token ${token.split(':')[0]}:… was rejected (revoked or mistyped; copy it again from @BotFather)`
    : /chat not found/.test(description) ? ` — TELEGRAM_CHAT_ID is "${chatId.slice(0, 5)}…" (${chatId.length} chars); channels/groups need -100… or @name, and the bot must be a member/admin` : '';
  return new Response(`Telegram error: ${description || r.status}${hint}`, { status: 502 });
}
