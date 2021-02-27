const Bots = require ('../../../models/bots');
const Servers = require ('../../../models/servers');
const { MessageEmbed } = require("discord.js")

module.exports.run = async (client , message, args) => {

        let bots = await Bots.find({ state: "verified" }, { _id: false })
        
        //let bots2 = await Bots.find({ _id: false })
        
        //let servers = await Servers.find({ _id: false })

        message.channel.send(new MessageEmbed()
            .setTitle("Botrix Bot Count")
            .addField("Approved Bots", `${bots.length}`)
            //.addField("Total Bots", "${bots2.length}")
            //.addField("Total Servers", "${servers.length}")
            .setColor(0x6b83aa))
    }

module.exports.help = {
    name: "count",
    category: "info",
    aliases: ['bot-count'],
    description: "Provides a total count of bots in our list",
    example: "``botinfo <@bot>``"
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ["EMBED_LINKS"],
    approverOnly: false
}