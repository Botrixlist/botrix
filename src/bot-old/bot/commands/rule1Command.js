const { MessageEmbed } = require ('discord.js');
const config = require('../../../config.json')

module.exports.run = async (client, message) => {
    try{
        if(!config.ADMIN_USERS.includes(message.author.id)) return;
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
}

module.exports.help = {
name: "hoist",
category: "Bots/Listed Bots",
aliases: ['h','3'],
description: "Rule number 3",
example: "``hoist``"
}

module.exports.requirements = {
userPerms: [],
clientPerms: ["EMBED_LINKS"],
approverOnly: false
}