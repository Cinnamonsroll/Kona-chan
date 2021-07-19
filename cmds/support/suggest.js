const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "suggest",
  aliases: ["sug"],
  category: "support",
  requiredArgs: 1,
  usage: "[Suggestion]",
  desc: "Sends a suggestion to the support server.",
  cooldown: 60000,
  exec(ctx, args) {
    const suggestionConfirmEmbed = new MessageEmbed()
      .setAuthor(
        "Suggestion Sent!",
        "https://cdn.discordapp.com/emojis/788137552984145990.gif?v=1"
      )
      .setColor("A0DA72")
      .setDescription(
        `Your suggestion was \`${args.join(" ")} (${args.length})\``
      );

    const suggestionEmbed = new MessageEmbed()
      .setAuthor(
        `Suggestion by ${ctx.member.displayName}`,
        ctx.author.displayAvatarURL({ dynamic: true })
      )
      .setColor("6F94E2")
      .setDescription(`${args.join(" ")} \`(${args.length})\``)
      .setTimestamp();

    const channel = client.channels.cache.get("862087648826490880");

    channel.send({ embeds: [suggestionEmbed] }).then((m) => {
      m.react("✅");
      m.react("🚫");
    });

    ctx.reply({ embeds: [suggestionConfirmEmbed] });
  },
};
