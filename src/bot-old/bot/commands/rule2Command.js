const { MessageEmbed } = require ('discord.js');
const config = require('../../../config.json')

module.exports.run = async (client, message) => {
    try{
        if(!config.ADMIN_USERS.includes(message.author.id)) return;
        let chan_ID = "747638024682078300";
        let chan = message.guild.channels.cache.get(chan_ID)
        message.delete()
        let rule3 = new MessageEmbed()
        .setTitle('#Rule 5')
        .setColor('#2f3136')
        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL())
        .setDescription(`Botrix allows you to advertise in our server for free in ${chan}, but you can always list your server on our site [here](https://botrix.cc/servers).\n\n**Server Rule :**\`\`\`fix\nIf you want to advertise, send your ad in #│self-promo. [ Remember if it's a botlist promo or any kind of NSFW promo. Our staff team has the right to remove it. ]\`\`\``)
        message.channel.send(rule3)
    }catch(err){
        message.channel.send(`Oops! looks like an error occurred : \`${err.message}\``)
    }
}

module.exports.help = {
name: "promo",
category: "Bots/Listed Bots",
aliases: ['selfpromo','5'],
description: "Rule number 5",
example: "``promo``"
}

module.exports.requirements = {
userPerms: [],
clientPerms: ["EMBED_LINKS"],
approverOnly: false
}