// Reading the command folders
const chalk = require("chalk");
const fs = require("fs");
const commandFolders = fs.readdirSync("./cmds");

if (!commandFolders.length) {
  log("setup", `Categories : ${chalk.bold.hex("#E04C4C")("404 Not Found")}`);
} else {
  log("setup", `Categories : ${chalk.bold.greenBright("200 OK")}`);
}

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./cmds/${folder}`)
    .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

  log(
    "cat",
    `${folder} (${commandFiles.length}) : ${chalk.bold.greenBright("200 OK")}`
  );

  for (const file of commandFiles) {
    const command = require(`../cmds/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

console.log("-");
