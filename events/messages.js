const { Collection } = require("discord.js");
const guildSettings = require("../database/guild");
const { prefix: gPref, devID } = require("../config.json");
const chalk = require("chalk");

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const botMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  const findGuild = await guildSettings.findOne({ _id: message.guild.id });

  if (message.content === botMention)
    message.reply(`The prefix is \`${await findGuild.prefix}\``);

  let prefix;

  if (message.guild) {
    if (message.content.startsWith(gPref)) {
      prefix = gPref;
    } else {
      const guildPrefix = await findGuild.prefix;
      if (message.content.startsWith(guildPrefix)) prefix = guildPrefix;
    }

    if (!prefix) return;
    args = message.content.slice(prefix.length).trim().split(/\s+/);
  } else {
    const slice = message.content.startsWith(gPref) ? gPref.length : 0;
    args = message.content.slice(slice).split(/\s+/);
  }

  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (!command.category) {
    command.category = "none";
  }

  if (command) {
    log(
      "cmd",
      `${message.author.tag} (${message.author.id}) used ${
        command.name
      } : ${chalk.bold.greenBright("200 OK")}`
    );

    client.commands.forEach((command) => {
      const category = client.categories.get(command.category);
      if (category) {
        category.set(command.name, command);
      } else {
        client.categories.set(
          command.category,
          new Collection().set(command.name, command)
        );
      }
    });

    if (command.ownerOnly && message.author.id !== devID) {
      message.reply("I don't think you are the developer...");
      return;
    }

    if (command.supportOnly && message.guild.id !== "861269810774802452") {
      message.reply(`This can only be used in the support server.`);
      return;
    }

    if (command.guildOnly && message.channel.type === "DM") return;

    if (message.channel.type === "GUILD_TEXT") {
      if (command.userPermissions) {
        const userPerms = message.member.permissionsIn(message.channel);

        if (!userPerms || !userPerms.has(command.userPermissions)) {
          message.reply(
            `The specified command requires the permisions \`${command.userPermissions
              .join(", ")
              .replace("_", " ")}\`, and you don't have those.`
          );
          return;
        }
      }

      if (command.botPermissions) {
        const botPerms = message.guild.me.permissionsIn(message.channel);

        if (!botPerms || !botPerms.has(command.botPermissions)) {
          message.reply(
            `I need the permissions: \`${command.botPermissions
              .join(", ")
              .replace("_", " ")}\`, and you don't have those.`
          );
          return;
        }
      }

      if (command.requiredArgs && args.length < command.requiredArgs) {
        const base = "Invalid usage, please ";

        if (command.usage) {
          return message.reply(
            (base += `use \`${prefix}${command.name} ${command.usage}\` instead.`)
          );
        } else {
          message.reply((base += "lookup the command on the help menu."));
        }
      }
    }

    const { cooldowns } = client;

    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        message.reply(
          `There ${
            timeLeft.toFixed(1) === 1
              ? `is \`${timeLeft.toFixed(1)} second\``
              : `are \`${timeLeft.toFixed(1)} seconds\``
          } remaining on the cooldown.`
        );
        return;
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
      command.exec(message, args);
    } catch (err) {
      log("error", err);
    }
  }
});
