const discord = require("discord.js");
const moment = require("moment");
const config = require("../../../../config.json");

module.exports = (client, member) => {
  const channele = member.guild.channels.cache.find(
    (ch) => ch.id === config.leave_chan
  );
  var currentDateAndTime = new Date().toLocaleString(); //"8/5/2019, 2:30:41 PM"

  const Embed = new discord.MessageEmbed()
    .setColor("#fca311")
    .setTitle("Member Left")
    .setDescription(
      `<@${member.user.id}> (${member.user.tag}) has left the server.`
    )
    .addField("Joined:", `${moment.utc(member.joinedAt).format("DD/MM/YY")}`)
    .addField("Left:", `${currentDateAndTime}`)
    .setTimestamp()
    .setAuthor("Botrix Logging", member.guild.iconURL());
  channele.send(Embed);
};
