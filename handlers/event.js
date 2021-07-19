const fs = require("fs");
const eventFiles = fs.readdirSync("./events");
const chalk = require("chalk");

if (!eventFiles.length) {
  log("setup", `Events : ${chalk.bold.hex("#E04C4C")("404 Not Found")}`);
} else {
  log("setup", `Events : ${chalk.bold.greenBright("200 OK")}`);
}

for (const file of eventFiles) {
  require(`../events/${file}`);
  const name = file.slice(0, -3);
  log("event", `${name} : ${chalk.bold.greenBright("200 OK")}`);
}

console.log("-");
