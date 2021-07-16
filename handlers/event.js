const chalk = require("chalk");
const fs = require("fs");

for (const file of fs.readdirSync("./events")) {
  const location = require.resolve(`../events/${file}`);
  const name = file.slice(0, -3);

  log("info", `${name} : ${chalk.greenBright("200 OK")}`);

  require(location);
}
