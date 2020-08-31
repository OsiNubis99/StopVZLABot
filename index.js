const express = require("express");

var bot = require("./configs/bot");
var app = express();

const { response } = require("express");
var groups = ["-1001432406771", "-358611014"];

app.use(express.static("./public"));
app.get("/Saludar", (req, res) => {
  res.send("CaidaBot!");
});

let port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log("Gator app listening on port " + port + "!")
);

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
