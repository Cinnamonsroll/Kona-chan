const { Collection } = require("discord.js");
const Discord = require("discord.js");
const { token, prefix } = require("./config.json");
const { log } = require("./scripts/logger");

globalThis.log = log;

globalThis.client = new Discord.Client({
  allowedMentions: { repliedUser: false },
  intents: ["GUILD_MESSAGES", "GUILDS"],
  presence: {
    activities: [{ name: "anime", type: "WATCHING" }],
    status: "idle",
  },
});

client.commands = new Collection();
client.categories = new Collection();
client.cooldowns = new Collection();

require("./handlers/event");
require("./handlers/command");

client.login(token);
