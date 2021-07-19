const { Schema, model } = require("mongoose");
const { prefix } = require("../config.json");

const guildSchema = new Schema({
  _id: { type: String, minLength: 17, maxLength: 19 },

  prefix: {
    type: String,
    minLength: 1,
    maxLength: 3,
    default: prefix,
  },

  official: { type: Boolean, default: false },
});

const guildConfig = model("guilds", guildSchema);

module.exports = guildConfig;
