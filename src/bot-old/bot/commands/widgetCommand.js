const Bots = require ('../../../models/bots');
const { MessageEmbed } = require ('discord.js');
const fetch = require ('node-fetch');

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    let botUser = message.mentions.users.first();

    const noBot = new MessageEmbed()
    noBot.setTitle('Whoops, You missed something!')
    noBot.setColor('RED')
    noBot.setDescription('Please ping the bot you would like to get a widget for!')
    noBot.setTimestamp()
    noBot.setFooter('© Botrix | 2020')

    if (!botUser) return message.channel.send(noBot)

    let url = `https://botrix.tk/api/embed/${botUser.id}` // Set your widget endpoint here (ie: https://botrix.tk/${botUser.id}/widget)

    let img = await fetch(url).then(res => res.buffer());

    message.channel.send({ files: [img] });
}

module.exports.help = {
    name: 'widget',
    category: 'Bots/Listed Bots',
    aliases: ['embed', 'bot-embed'],
    description: 'Sends the Embed/Widget that our API generated for the bot provided.',
    example: '``widget <@bot>``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS'],
    approverOnly: false
}