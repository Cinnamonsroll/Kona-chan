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
    return console.log(`${timeCheck()} ${prefix}: ${data}`);
  }

  switch (type) {
    case "log":
      return template(toColor("LOG", "bgGray"));
    case "error":
      return template(toColor("ERROR", "bgRed"));
    case "warn":
      return template(toColor("WARNING", "bgYellow"));
    case "info":
      return template(toColor("INFO", "bgBlue"));
    case "verbose":
      return template(toColor("VERBOSE", "bgCyan"));
    case "debug":
      return template(toColor("DEBUG", "bgMagenta"));
    case "silly":
      return template(toColor("SiLlY", "bgGreen"));
  }
}

module.exports = {
  toColor,
  log,
};
