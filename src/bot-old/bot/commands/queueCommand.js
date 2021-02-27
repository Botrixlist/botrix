const Bots = require ('../../../models/bots');
const { MessageEmbed } = require ('discord.js');
const config = require('../../../config.json')

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    let msg = "";
    let bots = await Bots.find({ state: "unverified" }, { _id: false })


    if (bots.length === 0) {
        msg = "There are currently no bots in our Queue, You can add one [here](https://botrix.cc/add/)";
    }else{
        bots.forEach(bot => {
            msg += `<@${bot.botid}> | [Invite](https://discord.com/oauth2/authorize?client_id=${bot.botid}&scope=bot&guild_id=${config.GUILD_ID}&permissions=0) : [Page](https://botrix.cc/bots/${bot.botid})\n \n`
        })
    }

    message.channel.send(new MessageEmbed()
        .addField("Bots in Queue", msg)
        .setColor('GREEN')
        .setFooter("(do *info @bot | <@botid> to get info about a bot)"+` Requested by ${message.author.tag}`))
}

module.exports.help = {
name: "queue",
category: "Bots/Listed Bots",
aliases: ['q', 'pending'],
description: "Provides a list of bots awaiting our approval",
example: "``queue``"
}

module.exports.requirements = {
userPerms: [],
clientPerms: ["EMBED_LINKS"],
approverOnly: false
}