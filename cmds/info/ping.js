const { MessageEmbed } = require("discord.js");
const check = require("../../scripts/random_bot");
const guildSettings = require("../../database/guild");

module.exports = {
  name: "ping",
  category: "info",
  desc: "Sends multiple latency stats for the bot.",
  async exec(ctx) {
    const thisTime = Date.now();
    await guildSettings.findOne();
    const total = Date.now() - thisTime;

    const pingEmbed = new MessageEmbed()
      .setAuthor("🏓 Pong", ctx.author.displayAvatarURL({ dynamic: true }))
      .setColor("6F94E2")
      .addFields(
        {
          name: "Client",
          value: `${check(client.ws.ping)} ${client.ws.ping}ms`,
        },
        {
          name: "Database",
          value: `${check(total)} ${total}ms`,
        }
      )
      .setFooter(`Requested by ${ctx.author.tag}`)
      .setTimestamp();

    const send = await ctx.reply("<a:loading:866444788467367947> Loading...");

    send.edit({
      embeds: [
        pingEmbed.addField(
          "Edit",
          `${check(send.createdTimestamp - ctx.createdTimestamp)} ${
            send.createdTimestamp - ctx.createdTimestamp
          }ms`
        ),
      ],
      content: null,
    });
  },
};
