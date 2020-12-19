const { exec } = require("child_process");
const config = require("../../../../config.json");

module.exports = {
  name: "exec",
  category: "Developer/mods",
  description: "eval you retard",
  example: "tf do you need an example for >.<",
  developerOnly: true,
  async execute(message, args) {
    if (!args.length)
      return message.channel.send("You must provide something to execute.");
    exec(args.join(" "), (error, stdout) => {
      const response = stdout || error;
      message.channel.send(response, { split: true, code: true });
    });
  },
};
