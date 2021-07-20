const { MessageEmbed } = require("discord.js");
const toProperCase = require("../../scripts/to_");
const { paginate } = require("../../scripts/random_bot");

module.exports = {
  name: "help",
  aliases: ["h", "halp", "helpme", "?", "commands", "cmds"],
  category: "info",
  desc: "Sends a menu for help with commands",
  usage: "[command]",
  async exec(ctx, args) {
    let pages = [
      new MessageEmbed({
        author: {
          name: "Bot's commands",
          icon_url: ctx.author.displayAvatarURL({ dynamic: true }),
        },
        color: "6F94E2",
        description: `\`\`\`fix\nYou can use "${this.name} ${
          this.usage
        }" to search for a command\`\`\`\n**Available Categories**\n**${client.categories
          .map((cat, name) => `ㅤ‏‏→ ${toProperCase(name)} (${cat.size})`)
          .join("\n")}**`,
        timestamp: new Date(),
        footer: {
          text: `Requested by ${ctx.author.tag}`,
        },
      }),
    ];

    client.categories.forEach((c, n) => {
      pages.push(
        new MessageEmbed({
          author: {
            name: `⌘ ${toProperCase(n)}`,
            icon_url: ctx.author.displayAvatarURL({ dynamic: true }),
          },
          color: "6F94E2",
          description: `You can use \`${this.name} ${
            this.usage
          }\` to search for a command\n\`\`\`fix\n${c
            .map((c) => c.name)
            .join(", ")}\`\`\``,
          timestamp: new Date(),
          footer: {
            text: `Requested by ${ctx.author.tag}`,
          },
        })
      );
    });

    if (!args.length) {
      paginate(ctx, pages, pages.length - 1);
    } else {
      const findCommand = client.commands.find(
        (c) => c.name === args[0] || (c.aliases && c.aliases.includes(args[0]))
      );

      if (findCommand) {
        const helpEmbed3 = new MessageEmbed()
          .setAuthor(
            `⌘ ${toProperCase(findCommand.name)}\n⎿ ${toProperCase(
              findCommand.category
            )}`,
            ctx.author.displayAvatarURL({ dynamic: true })
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
                    findCommand.botPermissions.join(", ").replace("_", " ")
                  )
                : "No permissions required..."
            }\`\n**→ User Permissions** - \`${
              findCommand.userPermissions
                ? toProperCase(
                    findCommand.userPermissions.join(", ").replace("_", " ")
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
          .setFooter(`Requested by ${ctx.author.tag}`)
          .setTimestamp();

        ctx.reply({ embeds: [helpEmbed3] });
      }
    }
  },
};
