if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
module.exports = {
  url: "https://" + process.env.npm_package_name + ".herokuapp.com:443",
  version: process.env.npm_package_version,
  name: process.env.npm_package_name,
  TOKEN: process.env.TELEGRAM_TOKEN,
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
};
