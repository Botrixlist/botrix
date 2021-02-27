const { MessageEmbed, client } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Ping the bot",
  usage: "(Prefix)ping",
  async execute(message) {
    message.delete();
    let botMsg = await message.channel.send(
      `Pinging... owo`
    );
    let ping = botMsg.createdTimestamp - message.createdTimestamp
    if(ping < 0 || ping < 1) ping = 0;
    let api = message.client.ws.ping;
    let colorVar;
    switch (true) {
      case ping < 150:
        colorVar = 0x7289da;
        break;
      case ping < 250:
        colorVar = 0x35fc03;
        break;
      case ping < 350:
        colorVar = 0xe3f51d;
        break;
      case ping < 400:
        colorVar = 0xf7700f;
        break;
      default:
        colorVar = 0xf7220f;
        break;
    }
    const embed = new MessageEmbed()
      .setAuthor(`Botrix`, message.guild.iconURL())
      .setColor(colorVar)
      .setThumbnail(message.author.displayAvatarURL())
      .setTitle(`Ping!`)
      .setDescription(`Ponged back the ping in ${ping}ms! (API: ${api}ms)`)
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL()
      );
    botMsg.edit(null, embed);
  },
};
