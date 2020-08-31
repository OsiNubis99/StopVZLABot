const TOKEN = process.env.TELEGRAM_TOKEN;
const TelegramBot = require("node-telegram-bot-api");
const options = {
  webHook: {
    // Port to which you should bind is assigned to $PORT variable
    // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
    port: process.env.PORT || 443,
  },
};

const url = process.env.APP_URL || "https://stopvzlabot.herokuapp.com:443";

const bot = new TelegramBot(TOKEN, options);

bot.onText(/\/connect/, (msg, match) => {
  bot.setWebHook(`${url}/bot${TOKEN}`);
  bot.sendMessage(msg.chat.id, "I am alive on Heroku!");
});

bot.onText(/\/disconnect/, (msg, match) => {
  bot.closeWebHook();
  bot.sendMessage(msg.chat.id, "I am not on Heroku any more!");
});

module.exports = bot;
