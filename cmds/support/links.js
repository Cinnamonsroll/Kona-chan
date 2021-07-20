const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "links",
  aliases: ["inv", "invite"],
  category: "support",
  desc: "Sends all the possible links for the bot.",
  exec(ctx) {
    const linksEmbed = new MessageEmbed()
      .setAuthor("Useful Links", ctx.author.displayAvatarURL({ dynamic: true }))
      .setColor("6F94E2")
      .setDescription(
        "These are all of the possible linkss for the bot if ya want."
      )
      .addFields(
        {
          name: "Permission Based",
          value:
            "• **[Minimum Permissions (recommended)](https://discord.com/oauth2/authorize?client_id=865601109842198528&permissions=388160&scope=bot)**\n• **[No Permissions](https://discord.com/oauth2/authorize?client_id=865601109842198528&scope=bot)**\n• **[Administrative Permissions](https://discord.com/oauth2/authorize?client_id=865601109842198528&permissions=8&scope=bot)**",
        },
        {
          name: "Extras Links",
          value:
            "• **[Support Server](https://discord.gg/gFSNAKMnbs)**\n• **[GitHub](https://github.com/BappyWasTaken/Kona-chan)**",
        }
      )
      .setFooter(`Requested by ${ctx.author.tag}`)
      .setTimestamp();

    ctx.reply({ embeds: [linksEmbed] });
  },
};
