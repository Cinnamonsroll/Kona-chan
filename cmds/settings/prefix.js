const { MessageEmbed } = require("discord.js");
const { check } = require("../../scripts/random_bot");
const guildSettings = require("../../database/guild");

module.exports = {
  name: "prefix",
  category: "settings",
  desc: "Sets the bot prefix.",
  requiredArgs: 1,
  usage: "[New Prefix]",
  userPermissions: ["MANAGE_GUILD"],
  guildOnly: true,
  async exec(ctx, args) {
    const findGuild = await guildSettings.findOne({ _id: ctx.guild.id });

    const tooLong = new MessageEmbed()
      .setAuthor("Yikes...", ctx.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`The prefix is too long.\n⁃\n**Err:** tooLong`)
      .setColor("E04C4C");

    const tooShort = new MessageEmbed()
      .setAuthor("Yikes...", ctx.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`The prefix is too short.\n⁃\n**Err:** tooShort`)
      .setColor("E04C4C");

    const successEmbed = new MessageEmbed()
      .setAuthor(
        "Prefix Set!",
        "https://cdn.discordapp.com/emojis/788137552984145990.gif?v=1"
      )
      .setColor("A0DA72")
      .setDescription(`Your new prefix is \`${args[0]}\``);

    const samePrefix = new MessageEmbed()
      .setAuthor("Yikes...", ctx.author.displayAvatarURL({ dynamic: true }))
      .setDescription(
        `You need to make a **new** prefix\n⁃\n**Err:** samePrefix`
      )
      .setColor("E04C4C");

    if (args[0].length > 3) {
      return ctx.reply({ embeds: [tooLong] });
    } else if (args[0].length < 1) {
      return ctx.reply({ embeds: [tooShort] });
    }

    if (args[0] === (await findGuild.prefix)) {
      return ctx.reply({ embeds: [samePrefix] });
    }

    findGuild.prefix = args[0];
    await findGuild.save();

    ctx.reply({ embeds: [successEmbed] });
  },
};
