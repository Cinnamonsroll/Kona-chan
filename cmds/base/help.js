const { MessageEmbed } = require("discord.js");
const toProperCase = require("../../scripts/to_");

module.exports = {
  name: "help",
  // aliases: ["h"],
  category: "Base",
  desc: "Sends a menu for help with commands",
  usage: "[category/command]",
  async exec(message, args) {
    const helpEmbed = new MessageEmbed()
      .setAuthor(
        `Bot's commands`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("6F94E2")
      .setDescription(
        `\`\`\`You can use "${this.name} ${
          this.usage
        }" to search for a command or category\`\`\`\n**Available Categories**\n**${client.categories
          .map((cat, name) => `ㅤ• ${name} (${cat.size})`)
          .join("\n")}**`
      );

    if (!args.length) {
      return message.reply({ embeds: [helpEmbed] });
    } else {
      const findCommand = client.commands.find((c) => c.name === args[0]);

      const findCategory = client.categories.find(
        (c, n) => n === toProperCase(args[0])
      );

      if (findCommand) {
        const helpEmbed3 = new MessageEmbed()
          .setAuthor(
            `Command: ${toProperCase(
              findCommand.name
            )}\nCategory: ${toProperCase(findCommand.category)}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("6F94E2")
          .setDescription(
            `Aliases: ${
              findCommand.aliases
                ? findCommand.aliases.join(" • ")
                : "No aliases found..."
            }`
          );

        message.reply({ embeds: [helpEmbed3] });
      } else if (findCategory) {
        const helpEmbed2 = new MessageEmbed()
          .setAuthor(
            `Category: ${toProperCase(args[0])}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setColor("6F94E2")
          .setDescription(
            `You can use \`${this.name} ${
              this.usage
            }\` to search for a command or category\n\`\`\`fix\n${findCategory
              .map((command) => command.name)
              .join(" • ")}\`\`\``
          );

        message.reply({ embeds: [helpEmbed2] });
      }
    }
  },
};
