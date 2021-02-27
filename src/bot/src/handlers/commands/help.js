const { MessageEmbed } = require("discord.js");
const settings = require("../../../../config.json");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Display all commands and descriptions",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(`${message.client.user.username} Help`)
      .setThumbnail(message.guild.iconURL())
      .setDescription(
        "The following list displays each command, along with their aliases and descriptions."
      )
      .setColor("#fca311");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${settings.prefix}${cmd.name} ${
          cmd.aliases ? `(${cmd.aliases})` : ""
        }**`,
        `${cmd.description || "None"}\n**Example:** ${cmd.example || "None"}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  },
};
