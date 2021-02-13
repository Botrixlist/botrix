const { MessageEmbed } = require("discord.js");
const config = require('../../../../config.json')

module.exports = {
  name: "staff",
  adminOnly: true,
  aliases: ["st"],
  async execute(message, args) {
    try{
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
        message.delete()
        let rule3 = new MessageEmbed()
        .setTitle('#FAQ - (Can I ping staff members?)')
        .setColor('#2f3136')
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`\`\`\`fix\n"Why is the Moderators role "pingable" and what is a "ping"?

A "ping" or a "tag" is where you mention a member (e.g. @Awish #6969) or role. This notifies that user or every user with that role.
Pinging one or two moderators for help is NOT a bad thing.
Pinging the entire staff team for no reason is wasting all of our time, and will result in a mute.
        
The role/s are pingable for emergencies only and not for you to get attention.
        
Emergency examples:
        
- Raids / Multiple members mass spamming.
- Anything that requires more than 2 Moderators to handle.
- Extreme disruption of the Discord ToS. (NSFW content inside non-NSFW marked channels)\`\`\``)
        message.channel.send(rule3)
    }catch(err){
        message.channel.send(`Oops! looks like an error occurred : \`${err.message}\``)
    }
  },
};
