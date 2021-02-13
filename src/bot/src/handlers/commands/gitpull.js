const { spawn } = require("child_process");
const { MessageEmbed } = require("discord.js");
const config = require("../../../../config.json");
const { execute } = require("./count");

module.exports = {
  name: "gitpull",
  description: "Pulls git from the github repo.",
  example: "``*gitpull``",
  developerOnly: true,
  async execute(message, args) {
    if (!config.OWNER_USERS.includes(message.author.id))
      return message.channel.send("Sorry, but you are not an admin of botrix");

    if (!args[0]) {
      const dataCommand = new MessageEmbed()
        .setTitle(`The github repo is now pulling to the client.`)
        .setAuthor(`Botrix`, message.guild.iconURL())
        .setColor("#fca311")
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
        .setTimestamp();

      const msg = await message.channel.send(dataCommand);
      const gitCmd = spawn("git", ["pull"]);

      gitCmd.stdout.on("data", (data) => {
        dataCommand.addField("Out:", `\`\`\` ${data} \`\`\``);
        msg.edit("", dataCommand);
      });

      gitCmd.stderr.on("data", (data) => {
        dataCommand.addField("Info:", `\`\`\` ${data} \`\`\``);
        msg.edit("", dataCommand);
      });

      gitCmd.on("error", (error) => {
        errorEmbed.addField("Error:", `\`\`\`${error}\`\`\``);
        msg.edit("", dataCommand);
      });

      gitCmd.on("close", (code) => {
        return;
      });
    } else if (args[0] === "-text") {
      const msg = await message.channel.send(
        "The github repo is now pulling to the client."
      );
      const gitCmd = spawn("git", ["pull"]);

      gitCmd.stdout.on("data", (data) => {
        message.channel.send(`\`\`\` Out: ${data} \`\`\``);
      });

      gitCmd.stderr.on("data", (data) => {
        message.channel.send(`\`\`\` Info: ${data} \`\`\``);
      });

      gitCmd.on("error", (error) => {
        message.channel.send(`\`\`\`Error: ${error}\`\`\``);
      });

      gitCmd.on("close", (code) => {
        return;
      });
    }
  },
};
