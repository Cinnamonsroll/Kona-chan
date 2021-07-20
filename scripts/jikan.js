function check(score) {
  if (score === 10) {
    return "<:squidyes:867152406013673502>";
  } else if (score < 10 && score >= 5) {
    return "<:squidup:867151684995645481>";
  } else if (score < 5) {
    return "<:squiddown:867151756639076382>";
  }
}

module.exports = { check };
