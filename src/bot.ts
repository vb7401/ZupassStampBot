import { Bot } from "grammy";

// Removing characters that mess up the HTML parsing of Telegram, as per
// https://core.telegram.org/bots/api#html-style
export function cleanString(str: string) {
  return str.replace("<", "&lt;").replace(">", "&gt;").replace("&", "&amp;");
}

export async function sendMessage(message: string, bot?: Bot) {
  console.log(message);

  if (bot !== undefined) {
    const supergroup_id = process.env.BOT_SUPERGROUP_ID;
    const channel_id = process.env.BOT_CHANNEL_ID;

    if (supergroup_id !== undefined && channel_id !== undefined) {
      const message_thread_id = parseInt(channel_id);
      const chat_id = parseInt(supergroup_id);
      if (!isNaN(message_thread_id) && !isNaN(chat_id)) {
        try {
          await bot.api.sendMessage(chat_id, message, {
            message_thread_id,
            parse_mode: "HTML",
          });

          sleep(2000);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}

export async function sendPhoto(photo: string, caption: string, bot?: Bot) {
  console.log(caption);
  if (bot !== undefined) {
    const supergroup_id = process.env.BOT_SUPERGROUP_ID;
    const channel_id = process.env.BOT_CHANNEL_ID;

    if (supergroup_id !== undefined && channel_id !== undefined) {
      const message_thread_id = parseInt(channel_id);
      const chat_id = parseInt(supergroup_id);
      if (!isNaN(message_thread_id) && !isNaN(chat_id)) {
        try {
          await bot.api.sendPhoto(chat_id, photo, {
            message_thread_id,
            caption,
            parse_mode: "HTML",
          });

          sleep(2000);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}

function sleep(miliseconds: number) {
  var currentTime = new Date().getTime();

  while (currentTime + miliseconds >= new Date().getTime()) {}
}
