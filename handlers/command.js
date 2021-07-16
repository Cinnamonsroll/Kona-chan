// Reading the command folders
const chalk = require("chalk");
const fs = require("fs");
const commandFolders = fs.readdirSync("./cmds");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./cmds/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const name = file.slice(0, -3);
    log("info", `${name} : ${chalk.greenBright("200 OK")}`);
    const command = require(`../cmds/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}
