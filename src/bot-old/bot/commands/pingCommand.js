const { MessageEmbed } = require ('discord.js');

module.exports.run = async (client, message) => {

    let botMsg = await message.channel.send(`Pinging... <:logo:760017304905449512> `);
        let ping = botMsg.createdTimestamp - message.createdTimestamp;
        let api = message.client.ws.ping;
       /*  let colorVar;
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
          .setTitle(`<:logo:760017304905449512> Ping!`)
          .setDescription(`Ponged back the ping in ${ping}ms! (API: ${api}ms)`)
          .setTimestamp()
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL()); */
        botMsg.edit(`🏓 Ponged back the ping in ${ping}ms! (API: ${api}ms)`);
      }

    


module.exports.help = {
name: "ping",
category: "Bots/Listed Bots",
aliases: ['p'],
description: "Check the ping of Botrix Bot",
example: "``ping``"
}

module.exports.requirements = {
userPerms: [],
clientPerms: ["EMBED_LINKS"],
approverOnly: false
}