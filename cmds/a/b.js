const { Permissions } = require("discord.js");

module.exports = {
  name: "a",
  userPermissions: ["ADMINISTRATOR"],
  botPermissions: ["ADMINISTRATOR"],
  exec() {
    console.log("a");
  },
};
