const { MessageEmbed } = require("discord.js");
const config = require('../../../../config.json')

module.exports = {
  name: "hoist",
  adminOnly: true,
  aliases: ["ht","3"],
  description: "Displays rule #3",

  async execute(message, args) {
    try{
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
        message.delete()
        let rule3 = new MessageEmbed()
        .setTitle('#Rule 3')
        .setColor('#2f3136')
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`Your name has the prefix **Moderated** as you were hoisting, which means having special characters at the beginning of your name which are [ \`!, @, #, etc\` ].\n\n**Server Rule :**\`\`\`fix\nDo not intentionally use characters to ‘hoist’ yourself at the top of the members list.\`\`\``)
        message.channel.send(rule3)
    }catch(err){
        message.channel.send(`Oops! looks like an error occurred : \`${err.message}\``)
    }
  },
};
