const { MessageEmbed } = require ('discord.js');
const config = require('../../../config.json')

module.exports.run = async (client, message) => {
    try{
        if(!config.ADMIN_USERS.includes(message.author.id)) return;
        message.delete()
        let rule3 = new MessageEmbed()
        .setTitle('#FAQ - (What is mini-modding? Can members do it too?)')
        .setColor('#2f3136')
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`\`\`\`fix\n"Mini-Modding" or "Backseat Moderating" is when a member who is NOT a Moderator, takes up the role (of Moderator) by demanding other members or taking part in Moderator actions such as :

- Requesting another member to move to the correct channels in a demanding manner.
        
- Investigating issues that you can't help with ("Investigations" are done by Moderators and only Moderators).
        
- Pestering a member to display their age to see if they are underage (although this isn't necessarily bad, some members have been found pestering members who don't wish to display their age).
Although we follow the Discord Terms of Service, we are not out to witch hunt new members.
        
- Attempting to handle situations in any of the channels when a Moderator is active or handling the situation themselves.\`\`\``)
        message.channel.send(rule3)
    }catch(err){
        message.channel.send(`Oops! looks like an error occurred : \`${err.message}\``)
    }
}

module.exports.help = {
name: "minimod",
category: "Bots/Listed Bots",
aliases: ['mm'],
description: "FAQ",
example: "``minimod``"
}

module.exports.requirements = {
userPerms: [],
clientPerms: ["EMBED_LINKS"],
approverOnly: false
}