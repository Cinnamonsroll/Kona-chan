const { MessageEmbed } = require("discord.js");
const { paginate } = require("../../scripts/random_bot");
const { check } = require("../../scripts/jikan");
const fetch = require("node-fetch");

module.exports = {
  name: "alist",
  aliases: ["animelist", "anilist"],
  category: "mal",
  desc: "Get's the list from JIKAN API.",
  requiredArgs: 1,
  usage: "[user]",
  async exec(ctx, args) {
    async function find(endpoint) {
      const data = await fetch(
        `https://api.jikan.moe/v3/user/${args[0]}/animelist/${endpoint}`,
        {}
      ).then((res) => res.json());

      return data.anime
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map((a) => `[${a.title}](${a.url}) - ${check(a.score)} ${a.score}/10`);
    }

    function newEmbed(type, color, title) {
      return new MessageEmbed({
        author: {
          name: `${args[0]}'s animelist - ${title}`,
          icon_url: ctx.author.displayAvatarURL({ dynamic: true }),
        },
        color,
        description: `${
          type.length !== 0 ? type.join("\n") : "None to be found..."
        }`,
        timestamp: new Date(),
        footer: {
          text: `Requested by ${ctx.author.tag}`,
        },
      });
    }

    let pages = [
      newEmbed(await find("all"), "#6F93E2", "All"),
      newEmbed(await find("watching"), "#2DB039", "Watching"),
      newEmbed(await find("completed"), "#25448F", "Completed"),
      newEmbed(await find("onhold"), "#F1C73E", "On Hold"),
      newEmbed(await find("dropped"), "#A12F31", "Dropped"),
      newEmbed(await find("ptw"), "#C3C3C3", "Plan to Watch"),
    ];

    paginate(ctx, pages);
  },
};
