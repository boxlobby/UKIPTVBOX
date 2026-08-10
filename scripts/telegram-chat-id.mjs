/*
  Prints the chat ids your order bot can currently post to.

  Usage:

    TELEGRAM_BOT_TOKEN=123456:AA... node scripts/telegram-chat-id.mjs

  Before running it: create the group, add the bot to it, and send one message
  in the group. Telegram only reports a chat through getUpdates once the bot
  has seen activity there.

  The token is read from the environment and never written anywhere. Prefer
  putting it in .dev.vars (gitignored) and running:

    export $(grep -v '^#' .dev.vars | xargs) && node scripts/telegram-chat-id.mjs
*/
const token = process.env.TELEGRAM_BOT_TOKEN?.trim();

if (!token) {
  console.error('Set TELEGRAM_BOT_TOKEN first. See the comment at the top of this file.');
  process.exit(1);
}

/* Never print the token, not even truncated — this output tends to get pasted. */
const call = async (method) => {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}`);
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) {
    const why = body?.description ?? `HTTP ${res.status}`;
    throw new Error(why.replaceAll(token, '<token>'));
  }
  return body.result;
};

try {
  const me = await call('getMe');
  console.log(`Bot: @${me.username} (${me.first_name})\n`);

  const updates = await call('getUpdates');
  const chats = new Map();

  for (const u of updates) {
    const chat = u.message?.chat ?? u.channel_post?.chat ?? u.my_chat_member?.chat;
    if (chat) chats.set(chat.id, chat);
  }

  if (chats.size === 0) {
    console.log('No chats yet.\n');

    /*
      Empty has two very different causes and the fix differs, so say which.
      A webhook silently drains the update queue — getUpdates then returns []
      forever and no amount of sending messages will change it.
    */
    const hook = await call('getWebhookInfo');
    if (hook.url) {
      console.log('A webhook is set on this bot, which swallows every update before');
      console.log(`getUpdates can see it:\n\n  ${hook.url}\n`);
      console.log('Clear it, then run this again:\n');
      console.log('  curl -s "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/deleteWebhook"');
      process.exit(0);
    }

    console.log('No webhook is set, so the bot simply has not seen any activity.');
    console.log('Telegram only queues messages sent AFTER the bot existed, and it');
    console.log('drops them after 24 hours.\n');
    console.log('Open the chat with @' + me.username + ', type an actual message');
    console.log('(not the Start button) and send it, then run this again.');
    process.exit(0);
  }

  console.log('Chats this bot can post to:\n');
  for (const chat of chats.values()) {
    const name = chat.title ?? [chat.first_name, chat.last_name].filter(Boolean).join(' ');
    console.log(`  ${String(chat.id).padEnd(16)}  ${chat.type.padEnd(10)}  ${name ?? ''}`);
  }
  console.log('\nUse the id of your orders group as TELEGRAM_CHAT_ID. Group ids are negative.');
} catch (err) {
  console.error(`Telegram rejected the request: ${err.message}`);
  console.error('If it says "Unauthorized", the token is wrong or has been revoked.');
  process.exit(1);
}
