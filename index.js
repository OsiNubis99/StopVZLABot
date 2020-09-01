const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const TOKEN = process.env.TELEGRAM_TOKEN;
const url = process.env.APP_URL || "https://stopvzlabot.herokuapp.com:443";
const port = process.env.PORT;
const is_dev = process.env.IS_DEV;

let options = {};
if (is_dev == "true") {
  options = {
    polling: true,
  };
}

const bot = new TelegramBot(TOKEN, options);

if (process.env.IS_DEV != "true") bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();

app.use(express.json());

app.use(express.static("./public"));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/Saludar", (req, res) => {
  res.send("CaidaBot!");
});

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

var server = app.listen(port, function () {
  console.log(
    `Express server is listening on ${server.address().address}:${port}`
  );
});

var groups = ["-1001432406771", "-358611014"];

bot.on("inline_query", (query) => {
  bot.answerInlineQuery(
    query.id,
    [
      {
        id: "3",
        type: "article",
        input_message_content: {
          message_text: "/unirse",
        },
        title:
          "No se ha unido a ningun juego \nEste juego solo esta permitido [Aqui](https://t.me/JuegosVZLA)",
      },
    ],
    {
      is_personal: true,
      cache_time: 1,
    }
  );
});

bot.on("chosen_inline_result", (query) => {
  bot.sendMessage(query.from.id, "Holi");
});

bot.onText(/\/saluda (.+)/, (msg, match) => {
  let chatId = msg.chat.id;
  let resp = "Hola @" + msg.from.username + "\nTu mensaje fue: " + match[1];
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, (msg, match) => {
  let chatId = msg.chat.id;
  let resp = "Hola @" + msg.from.username;
  bot.sendMessage(chatId, resp);
});

bot.on("text", (msg) => {
  let chatId = msg.chat.id;
  let resp = "Hola @" + msg.from.username;
  bot.sendMessage(chatId, resp);
});

bot.on("error", (error) => {
  console.error(error);
});

bot.on("polling_error", (error) => {
  console.error(error);
});
