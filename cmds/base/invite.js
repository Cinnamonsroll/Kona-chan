const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  desc: "Sends all the possible invite links for the bot.",
  exec(message) {
    const inviteEmbed = new MessageEmbed()
      .setAuthor(
        `Invites for ${message.guild.me.displayName}`,
        client.user.displayAvatarURL()
      )
      .setColor("6F94E2")
      .setDescription(
        "These are all of the possible invites for the bot if ya want.\nOnce the support server like exists, this will be updated with that link aswell, but for now it will just be the bot's links."
      )
      .addFields({
        name: "Permission Based",
        value:
          "These are based on what permissions you need for the bot.\n\n• **[Minimum Permissions (recommended)](https://discord.com/oauth2/authorize?client_id=865601109842198528&permissions=347200&scope=bot)**\n• **[No Permissions](https://discord.com/oauth2/authorize?client_id=865601109842198528&scope=bot)**\n• **[Administrative Permissions](https://discord.com/oauth2/authorize?client_id=865601109842198528&permissions=8&scope=bot)**",
      });

    message.reply({ embeds: [inviteEmbed] });
  },
};
