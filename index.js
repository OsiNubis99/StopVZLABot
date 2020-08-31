// ----------------------- Server -----------------------
const express = require("express");

var app = express();

var groups = ["-1001432406771", "-358611014"];

app.use(express.static("./public"));
app.get("/Saludar", (req, res) => {
  res.send("CaidaBot!");
});

let port = process.env.PORT || 3000;
let url = process.env.APP_URL || "127.0.0.1";
app.listen(port, () =>
  console.log("Bot listening on port " + url + ":" + port + "!")
);
// ------------------------ Bot ------------------------
var bot = require("./configs/bot");

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
