const fs = require("fs");
const databaseFiles = fs.readdirSync("./database");
const chalk = require("chalk");

if (!databaseFiles.length) {
  log("setup", `Models : ${chalk.bold.hex("#E04C4C")("404 Not Found")}`);
} else {
  log("setup", `Models : ${chalk.bold.greenBright("200 OK")}`);
}

for (const file of databaseFiles) {
  require(`../database/${file}`);
  const name = file.slice(0, -3);

  log("mongo", `${name} : ${chalk.bold.greenBright("200 OK")}`);
}

console.log("-");
