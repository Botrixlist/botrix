const { MessageEmbed } = require("discord.js");
const config = require('../../../../config.json')

module.exports = {
  name: "nsfw",
  adminOnly: true,
  aliases: ["9"],
  async execute(message, args) {
    try{
      if(!message.member.roles.cache.has(config.COMMANDS_ROLE)) return;
        message.delete()
        let rule3 = new MessageEmbed()
        .setTitle('#Rule 9')
        .setColor('#2f3136')
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`We do have a NSFW channel too ${message.guild.channels.cache.get("750123803232829441")}\n\n**Server Rule :**\`\`\`fix\nNo NSFW content within the server
{ - You can test for NSFW in the #nsfw¹  channel }\`\`\``)
        message.channel.send(rule3)
    }catch(err){
        message.channel.send(`Oops! looks like an error occurred : \`${err.message}\``)
    }
  },
};
