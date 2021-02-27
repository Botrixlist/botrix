const discord = require("discord.js");
const moment = require("moment");
const config = require("../../../../config.json");

module.exports = (client, member) => {
  const channel = member.guild.channels.cache.get(config.leave_chan);
  
  var currentDateAndTime = new Date().toLocaleString();

  const embed = new discord.MessageEmbed()
    .setColor("#fca311")
    .setTitle("Member Left")
    .setDescription(`<@${member.user.id}> (${member.user.tag}) has left the server.`)
    .addField("Joined:", `${moment.utc(member.joinedAt).format("DD/MM/YY")}`)
    .addField("Left:", currentDateAndTime)
    .addField("Total Members:", member.guild.memberCount)
    .setTimestamp()
    .setAuthor("Botrix Logging", member.guild.iconURL());
  channel.send(embed);
}
