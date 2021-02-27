const Bots = require("../../../../models/bots");
const Servers = require("../../../../models/servers");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "count",
  category: "info",
  aliases: ["bot-count"],
  description: "Provides a total count of bots in our list",
  example: "``*botinfo <@bot>``",
  async execute(message) {
    let bots = await Bots.find({ state: "verified" }, { _id: false });

    const embed = new MessageEmbed()
      .setAuthor("Botrix", message.guild.iconURL())
      .setTitle("Botrix Bot Count")
      .addField("Approved Bots", `${bots.length}`)
      .setColor("#6b83aa")
      .setTimestamp()
      .setFooter("© Botrix | 2020");
    return message.channel.send(embed);
  },
};
