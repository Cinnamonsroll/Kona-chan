const { Collection, MessageEmbed } = require("discord.js");
const guildSettings = require("../database/guild");
const { devID, prefix } = require("../config.json");
const chalk = require("chalk");

client.on("messageCreate", async (ctx) => {
  if (ctx.author.bot) return;

  const botMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  const findGuild = await guildSettings.findOne({ _id: ctx.guild.id });

  if (!findGuild) {
    const doc = new guildSettings({
      _id: ctx.guild.id,
    });

    doc.save();

    log(
      "mongo",
      `${ctx.guild.name} (${ctx.guild.memberCount}) : ${chalk.bold.greenBright(
        "Added to database"
      )}`
    );
    return;
  }

  if (ctx.content.match(botMention)) {
    ctx.reply(`The prefix is \`${await findGuild.prefix}\``);
  }

  if (ctx.guild) {
    if (!ctx.content.startsWith((await findGuild.prefix) || prefix)) return;
    args = ctx.content
      .slice((await findGuild.prefix.length) || prefix.length)
      .trim()
      .split(/\s+/);
  } else return;

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
      `${ctx.author.tag} (${ctx.author.id}) used ${
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

    if (command.ownerOnly && ctx.author.id !== devID) {
      const ownerOnly = new MessageEmbed()
        .setAuthor("Yikes...", ctx.author.displayAvatarURL({ dynamic: true }))
        .setDescription(
          "I don't think you are the **bot developer**...\n⁃\n**Err:** notOwner"
        )
        .setColor("E04C4C");

      ctx.reply({ embeds: [ownerOnly] });
      return;
    }

    if (command.guildOnly && ctx.channel.type === "DM") return;

    if (ctx.channel.type === "GUILD_TEXT") {
      if (command.userPermissions) {
        const userPerms = ctx.member.permissionsIn(ctx.channel);

        if (!userPerms || !userPerms.has(command.userPermissions)) {
          const permError = new MessageEmbed()
            .setAuthor(
              "Yikes...",
              ctx.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              `The specified command requires the permisions \`${command.userPermissions
                .join(", ")
                .replace(
                  "_",
                  " "
                )}\`, and you don't have those.\n⁃\n**Err:** invalidPermissions`
            )
            .setColor("E04C4C");

          ctx.reply({ embeds: [permError] });
          return;
        }
      }

      if (command.botPermissions) {
        const botPerms = ctx.guild.me.permissionsIn(ctx.channel);

        if (!botPerms || !botPerms.has(command.botPermissions)) {
          const permError = new MessageEmbed()
            .setAuthor(
              "Yikes...",
              ctx.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              `I need the permissions: \`${command.botPermissions
                .join(", ")
                .replace(
                  "_",
                  " "
                )}\`, but I don't have those.\n⁃\n**Err:** invalidPermissions`
            )
            .setColor("E04C4C");

          ctx.reply({ embeds: [permError] });
          return;
        }
      }

      if (command.requiredArgs && args.length < command.requiredArgs) {
        let base = "Invalid usage, ";

        if (command.usage) {
          const argsError = new MessageEmbed()
            .setAuthor(
              "Yikes...",
              ctx.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              (base += `use \`${await findGuild.prefix}${command.name} ${
                command.usage
              }\` instead.\n⁃\n**Err:** invalidUsage`)
            )
            .setColor("E04C4C");

          ctx.reply({ embeds: [argsError] });
          return;
        } else {
          const argsError = new MessageEmbed()
            .setAuthor(
              "Yikes...",
              ctx.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(
              (base += `lookup the command on the help menu.\n⁃\n**Err:** invalidUsage`)
            )
            .setColor("E04C4C");

          ctx.reply({ embeds: [argsError] });
          return;
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

    if (timestamps.has(ctx.author.id)) {
      const expirationTime = timestamps.get(ctx.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;

        const cooldownError = new MessageEmbed()
          .setAuthor("Yikes...", ctx.author.displayAvatarURL({ dynamic: true }))
          .setDescription(
            `There ${
              timeLeft.toFixed(1) === 1
                ? `is \`${timeLeft.toFixed(1)} second\``
                : `are \`${timeLeft.toFixed(1)} seconds\``
            } remaining on the cooldown.\n⁃\n**Err:** invalidUsage`
          )
          .setColor("E04C4C");

        ctx.reply({ embeds: [cooldownError] });

        return;
      }
    }

    timestamps.set(ctx.author.id, now);
    setTimeout(() => timestamps.delete(ctx.author.id), cooldownAmount);

    command.exec(ctx, args).catch((a) => log("error", a));
  }
});
