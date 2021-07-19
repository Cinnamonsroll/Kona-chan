const chalk = require("chalk");

client.once("ready", () => {
  log("info", `${client.user.username} : ${chalk.bold.greenBright("200 OK")}`);
  console.log("-");
});
