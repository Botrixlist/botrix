const bots = require ('../../../models/bots');
const config = require('../../../config.json');
const servers = require('../../../models/servers');
const { MessageEmbed } = require ('discord.js');
const fetch = require ('node-fetch');

module.exports.run = async (client, message, args) => {

    message.delete().catch()
    let bot = message.mentions.members.first();

    if(!config.ADMIN_USERS.includes(message.author.id)) return message.channel.send('Sorry, but you are not an admin of botrix');

    const unknownErr = new MessageEmbed()
        unknownErr.setTitle('Whoops, Something went wrong on our end..')
        unknownErr.setColor('RED')
        unknownErr.setDescription('An error has occured, please check logs.')
        unknownErr.setTimestamp()
        unknownErr.setFooter('© Botrix | 2020')
    
    const error = new MessageEmbed()
        error.setTitle('This bot is not in the cert queue!')
        error.setColor('RED')
        error.setDescription('This bot does not exist or does not have a "pending" status')
        error.setTimestamp()
        error.setFooter('© Botrix | 2020')

    const sucsess = new MessageEmbed()
        .setTitle(`${bot ? bot.user.username : args[0]} has been declined for Certification`)
        .setColor("RED")
        .setTimestamp();

    let bots_ = await bots.findOne({ botid: bot ? bot.user.id : args[0],  certified: "pending"  });

    let servers_ = await servers.findOne({ guildID: args[0], certified: "pending" });

    if(!bots_ && !servers_) return message.channel.send(error);

    try{
        bot ? await bots.updateOne({ botid: bot.user.id }, {$set: { certified: "unverified" }}) : await servers.updateOne({ guildID: args[0]}, {$set: { certified: "unverified" }})

        client.channels.cache.find(c => c.id === config.CERT_LOGS).send(sucsess);
        client.guilds.cache.get(config.GUILD_ID).member(bot ? bots_.owners[0] : servers_.owners[0]).send(sucsess);

    } catch(e) {
        message.channel.send(unknownErr);
        console.error(`Deny Cert Error: ${e}`);

    }
}

module.exports.help = {
    name: 'denycert',
    category: 'Developer/mods',
    aliases: [],
    description: 'certification denial command',
    example: 'denycert @bot'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS'],
    approverOnly: false
}