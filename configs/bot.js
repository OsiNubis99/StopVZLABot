const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.TELEGRAM_TOKEN;
const url = process.env.APP_URL || "https://stopvzlabot.herokuapp.com:443";

let options = {};
if (process.env.IS_DEV == "true") {
  options = {
    polling: true,
  };
} else {
  options = {
    webHook: {
      port: process.env.PORT || 443,
    },
  };
}

const bot = new TelegramBot(TOKEN, options);

if (process.env.IS_DEV != "true") bot.setWebHook(`${url}/bot${TOKEN}`);

bot.onText(/\/disconnect/, (msg, match) => {
  bot.closeWebHook();
  bot.sendMessage(msg.chat.id, "I am not on Heroku any more!");
});

module.exports = bot;
