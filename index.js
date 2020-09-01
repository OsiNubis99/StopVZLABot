require("./configs/server");
const kb = require("node-telegram-keyboard-wrapper");
const bot = require("./configs/bot");

var groups = ["-1001432406771", "-358611014"];
var test = {
  conf: true,
  como: false,
};

bot.on("callback_query", (query) => {
  let chatId = query.message.chat.id;
  if (query.data == "Unirse") {
    bot.answerCallbackQuery(query.id, {
      url: "t.me/DevVZLABot?start=" + chatId,
    });
  }
  if (query.data == "Configurar") {
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(chatId, "Config");
  }
  if (query.data == "Como jugar") {
    bot.answerCallbackQuery(query.id);
    bot.sendMessage(chatId, "como jugar");
  }
});

bot.onText(/\/crear/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Partida Creada.",
    new kb.InlineKeyboard()
      .addRow(
        {
          text: "Configurar",
          callback_data: "Configurar",
        },
        {
          text: "Como Jugar",
          callback_data: "Como jugar",
        }
      )
      .addRow({ text: "Unirse", callback_data: "Unirse" })
      .build()
  );
});

bot.onText(/\/start(.*)/, (msg, match) => {
  let chatId = msg.chat.id;
  let resp;
  if (match.input == "/start") {
    resp = "Hola @" + msg.from.username;
  } else {
    resp = "Te has unido al juego en el grupo";
  }
  console.log(match);
  bot.sendMessage(chatId, resp);
});

bot.setMyCommands([
  {
    command: "crear",
    description: "Crea una nueva partida",
  },
  {
    command: "unirse",
    description: "Te agrega a la partida",
  },
  {
    command: "iniciar",
    description: "Inicia la partida",
  },
  {
    command: "eliminar",
    description: "Elimina la partida",
  },
  {
    command: "configurar",
    description: "Abre el menu de configuracion",
  },
  {
    command: "instruciones",
    description: "Muestra informacion sebre como jugar",
  },
]);
