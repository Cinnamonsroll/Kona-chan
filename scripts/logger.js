const chalk = require("chalk");

function toColor(data, color, type = "default") {
  if (type === "default")
    return chalk.bold.hex("#FFFFFF")[color](`[ ${data} ]`);
  else if (type === "hex")
    return chalk.bold.hex("#FFFFFF").bgHex(color)(`[ ${data} ]`);
  else if (type === "none") return data;
}

function log(type = "log", data = null, time = true) {
  const hourMinute = new Date().toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
  });

  function timeCheck() {
    if (time) return "( " + hourMinute + " )";
    else return "";
  }

  function template(prefix) {
    return console.log(`${timeCheck()} ⎇ ${prefix} → ${data}`);
  }

  switch (type) {
    case "log":
      return template(toColor("LOG", "#4C57E0", "hex"));
    case "error":
      return template(toColor("ERROR", "#E04C4C", "hex"));
    case "warn":
      return template(toColor("WARNING", "#E04C4C", "hex"));
    case "info":
      return template(toColor("INFO", "#4C57E0", "hex"));
    case "verbose":
      return template(toColor("VERBOSE", "#4C57E0", "hex"));
    case "debug":
      return template(toColor("DEBUG", "#A84CE0", "hex"));
    case "mongo":
      return template(toColor("DATABASE", "#249225", "hex"));
    case "cmd":
      return template(toColor("COMMAND", "#FF69B4", "hex"));
    case "cat":
      return template(toColor("CATEGORY", "#FF69B4", "hex"));
    case "event":
      return template(toColor("EVENT", "#E0BC4C", "hex"));
    case "setup":
      return template(toColor("SETUP", "#4CCCE0", "hex"));
  }
}

module.exports = {
  toColor,
  log,
};
