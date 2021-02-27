const { MessageEmbed } = require("discord.js");
const config = require('../../../../config.json')

module.exports = {
  name: "memec",
  adminOnly: true,
  aliases: ["memechan", "9"],
  description: "Displays rule #9",

  async execute(message, args) {
    try{
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
        let chan_ID = "747638024682078300";
        let chan = message.guild.channels.cache.get(chan_ID)
        message.delete()
        let rule3 = new MessageEmbed()
        .setTitle('#Rule 9')
        .setColor('#2f3136')
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`Yes we have a meme channel too ${message.guild.channels.cache.get("748448756432633878")}. But it is strictly prohibited to keep memes out of ${message.guild.channels.cache.get("747393837877428346")}.\n\n**Server Rule :**\`\`\`fix\nStay on channel topic when communicating:
{ - Post memes only in #│memes-and-media  }
{ - #│general  is for friendly and general conversations }\`\`\``)
        message.channel.send(rule3)
    }catch(err){
        message.channel.send(`Oops! looks like an error occurred : \`${err.message}\``)
    }
  },
};
