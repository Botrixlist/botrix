const servers = require ('../../../models/servers');
const { MessageEmbed } = require ('discord.js');
const MS = require('ms');
const fetch = require ('node-fetch');

module.exports.run = async (client, message, args) => {

    message.delete().catch()

    const noServer = new MessageEmbed()
        noServer.setTitle('Whoops, Something went wrong on our end..')
        noServer.setColor('RED')
        noServer.setDescription('Your server is not on the list!')
        noServer.setTimestamp()
        noServer.setFooter('© Botrix | 2020')
    
    const tooEarly = new MessageEmbed()
        tooEarly.setTitle('Try again in an hour!')
        tooEarly.setColor('RED')        
        tooEarly.setTimestamp()
        tooEarly.setFooter('© Botrix | 2020')

    const sucsess = new MessageEmbed()
        .setTitle(`${message.guild.name} has been bumped!`)
        .setColor("RED")
        .setThumbnail('https://i.imgur.com/YdZpZlF.png')
        .setDescription(`${message.guild.name} has been bumped up!`)
        .setTimestamp();


   let server = await servers.findOne({ guildID: message.guild.id });

   if(!server) return message.channel.send(noServer);
   let timeout = 3600000;
   try{
    if(!timeout - (Date.now() - server.bumped) > 0){
        await servers.updateOne({ guildID: message.guild.id }, {$set: { bumped: Date.now() }});
       return message.channel.send(sucsess);
    } else{
        tooEarly.setDescription(`Try again in ${MS(timeout - (Date.now() - server.bumped))}`)
        return message.channel.send(tooEarly);
    }
   } catch(e){
       message.channel.send(`Oops, an internal error occured.. Maybe this will help you! \`\`\`\n ${e} \`\`\` `);
   } 

}

module.exports.help = {
    name: 'bump',
    category: 'Servers/Listed servers',
    aliases: ['vote', 'server-bump'],
    description: 'Bumps your server up',
    example: '``bump``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS'],
    approverOnly: false
}

module.exports.limits = {
    RateLimit: 2,
    cooldown: 1e4
}