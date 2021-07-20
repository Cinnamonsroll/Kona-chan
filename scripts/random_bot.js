function check(provider) {
  if (provider > 0 && provider < 80) {
    return "<:good:867149586971623444>";
  } else if (provider > 80 && provider < 150) {
    return "<:meh:867149747889504287>";
  } else if (provider > 150) {
    return "<:bad:867149825564999710>";
  }
}

async function paginate(providerA, providerB) {
  let options = {
    limit: 15 * 1000,
    min: 0,
    max: providerB.length - 1,
  };

  let page = 0,
    msg = await providerA.channel.send({ embeds: [providerB[page]] }),
    reactions = [
      "<a:left:867161820317614081>",
      "<a:die:867162440394342421>",
      "<a:right:867161991520976906>",
    ],
    filter = (reaction, user) =>
      reactions.includes(reaction.emoji.name) &&
      user.id === providerA.member.id;

  await Promise.all(reactions.map((r) => msg.react(r)));

  let collector = msg.createReactionCollector(filter, { time: 15000 });

  collector.on("collect", async (reaction, user) => {
    reaction.users.remove(providerA.author.id).catch((a) => log("error", a));

    switch (reaction.emoji.name) {
      case "left":
        page !== options.min ? (page = page - 1) : (page = options.max);
        await msg.edit({ embeds: [providerB[page]] });
        break;
      case "die":
        msg.reactions.removeAll().catch((a) => log("error", a));
        break;
      case "right":
        page !== options.max ? (page = page + 1) : (page = options.min);
        await msg.edit({ embeds: [providerB[page]] });
        break;
    }
  });
}

module.exports = { paginate, check };
