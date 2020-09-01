const express = require("express");
const env = require("./env");

const app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send(env.name);
});

app.post(`/bot${env.TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

module.exports = app.listen(env.port, function () {
  console.log(`Express server is listening on port ${env.port}`);
});
