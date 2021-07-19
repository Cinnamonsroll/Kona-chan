function check(provider) {
  if (provider > 0 && provider < 80) {
    return "<:online_moment:866339633520312383>";
  } else if (provider > 80 && provider < 150) {
    return "<:idle_moment:866339211605966858>";
  } else if (provider > 150) {
    return "<:dnd_moment:866339693834928178>";
  }
}

module.exports = check;
