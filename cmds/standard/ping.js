const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  desc: "Sends multiple latency stats for the bot.",
  exec(message) {
    const inviteEmbed = new MessageEmbed()
      .setAuthor("🏓 Pong", message.author.displayAvatarURL({ dynamic: true }))
      .setColor("6F94E2")
      .addFields({
        name: "Client Ping",
        value: `${client.ws.ping}ms`,
      })
      .setFooter(`Requested by ${message.author.tag}`)
      .setTimestamp();

    message.reply({ embeds: [inviteEmbed] });
  },
};
