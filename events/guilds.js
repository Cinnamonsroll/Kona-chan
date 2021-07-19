const guildSettings = require("../database/guild");
const chalk = require("chalk");

let channel = client.channels.cache.get("862088771850993684");

client.on("guildCreate", (guild) => {
  const doc = new guildSettings({
    _id: guild.id,
  });

  doc.save();

  log(
    "mongo",
    `${guild.name} (${guild.memberCount}) : ${chalk.bold.greenBright(
      "Added to database"
    )}`
  );

  channel.send(
    `<:join:866435133536337930> Joined \`${guild.name}\` w/ ${guild.memberCount} members`
  );
});

client.on("guildDelete", (guild) => {
  guildSettings.findOneAndRemove({ _id: guild.id });

  log(
    "mongo",
    `${guild.name} (${guild.memberCount}) : ${chalk.bold.hex("#E04C4C")(
      "Removed from database"
    )}`
  );

  channel.send(
    `<:leave:866435280642113567> Left \`${guild.name}\` w/ ${guild.memberCount} members`
  );
});
