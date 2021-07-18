const { MessageEmbed } = require("discord.js");
const toProperCase = require("../../scripts/to_");

module.exports = {
  name: "help",
  aliases: ["h", "halp", "helpme", "?", "commands", "cmds"],
  category: "info",
  desc: "Sends a menu for help with commands",
  usage: "[category/command]",
  async exec(message, args) {
    const helpEmbed = new MessageEmbed()
      .setAuthor(
        "Bot's commands",
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("6F94E2")
      .setDescription(
        `\`\`\`fix\nYou can use "${this.name} ${
          this.usage
        }" to search for a command or category\`\`\`\n**Available Categories**\n**${client.categories
          .map((cat, name) => `ㅤ‏‏→ ${toProperCase(name)} (${cat.size})`)
          .join("\n")}**`
      )
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    if (!args.length) {
      return message.reply({ embeds: [helpEmbed] });
    } else {
      const findCommand = client.commands.find(
        (c) => c.name === args[0] || (c.aliases && c.aliases.includes(args[0]))
      );

      const findCategory = client.categories.find(
        (c, n) => n === args[0].toLowerCase()
      );

      if (findCommand) {
        const helpEmbed3 = new MessageEmbed()
          .setAuthor(
            `⌘ ${toProperCase(findCommand.name)}\n⎿ ${toProperCase(
              findCommand.category
            )}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("6F94E2")
          .setDescription(
            `**→ Aliases** - \`${
              findCommand.aliases
                ? findCommand.aliases.join(", ")
                : "No aliases found..."
            }\`\n\n**→ Bot Permissions** - \`${
              findCommand.botPermissions
                ? toProperCase(
                    findCommand.botPermissions.join(" ・ ").replace("_", " ")
                  )
                : "No permissions required..."
            }\`\n**→ User Permissions** - \`${
              findCommand.userPermissions
                ? toProperCase(
                    findCommand.userPermissions.join(" ・ ").replace("_", " ")
                  )
                : "No permissions required..."
            }\`\n\n**→ Location Status** - \`${
              findCommand.guildOnly
                ? "Restricted to servers..."
                : "Can be used anywhere..."
            }\`\n**→ Restriction Staus** - \`${
              findCommand.ownerOnly
                ? "Restricted to the developer..."
                : "Anyone can use..."
            }\`\n\n**→ Required Arguments** - \`${
              findCommand.requiredArgs
                ? findCommand.requiredArgs
                : "No required arguments..."
            }\`\n**→ Command Usage** - \`${
              findCommand.usage
                ? findCommand.name + " " + findCommand.usage
                : "No required usage..."
            }\``
          )
          .setFooter(`Requested by ${message.author.tag}`)
          .setTimestamp();

        message.reply({ embeds: [helpEmbed3] });
      } else if (findCategory) {
        const helpEmbed2 = new MessageEmbed()
          .setAuthor(
            `⌘ ${toProperCase(args[0])}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("6F94E2")
          .setDescription(
            `You can use \`${this.name} ${
              this.usage
            }\` to search for a command or category\n\`\`\`fix\n${findCategory
              .map((command) => command.name)
              .join(" ・ ")}\`\`\``
          )
          .setFooter(`Requested by ${message.author.tag}`)
          .setTimestamp();

        message.reply({ embeds: [helpEmbed2] });
      }
    }
  },
};
