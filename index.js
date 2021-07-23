const { Collection } = require("discord.js");
const Discord = require("discord.js");
const { token } = require("./config.json");
const { log } = require("./scripts/logger");
const mongoose = require("mongoose");

globalThis.log = log;

globalThis.client = new Discord.Client({
  allowedMentions: { repliedUser: false },
  intents: ["GUILD_MESSAGES", "GUILDS", "GUILD_MESSAGE_REACTIONS"],
  presence: {
    activities: [{ name: "anime", type: "WATCHING" }],
    status: "idle",
  },
});

mongoose.connect("mongodb://localhost/kona-chan", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

client.commands = new Collection();
client.categories = new Collection();
client.cooldowns = new Collection();

for(let handler of require("fs").readdirSync("./handlers.js")){
require(handler)
}

client.login(token);
