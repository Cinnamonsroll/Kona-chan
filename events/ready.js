const chalk = require("chalk");

client.once("ready", () => {
  log("info", `${client.user.username} : ${chalk.greenBright("200 OK")}`);
});
