const discord = require('discord.js');
const config = require('../../../config.json');

module.exports.run = async (client , message, args) => {
    if(config.OWNER_USERS.includes(message.author.id)){

        try{
            const result = eval(args.join(" "));
            const embed = new discord.MessageEmbed()
            .setTitle("Evaluation")
            .addField("To Eval:", `\`\`\`js\n ${args.join(" ")} \n\`\`\``)
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .addField("Success!", `\`\`\`js\n${result}\n\`\`\``)
            .addField("Type Of: ", typeof(result))
            .setColor('#00cc00')
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(embed);
        } catch(e){
            const embed = new discord.MessageEmbed()
            .setTitle(":x: Failed! :x:")
            .setColor('#ff0000')
            .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(e);

            message.channel.send(embed);
        }

    } else {
        const embed = new discord.MessageEmbed()
        .setTitle(`:x: You do not have permission to execute this command! :x:`)
        .setColor('#ff0000')
        .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL());
        return message.channel.send(embed);
    }
};

module.exports.help = {
    name: 'eval',
    category: 'Developer/mods',
    aliases: [],
    description: 'eval you retard',
    example: 'tf do you need an example for >.<'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS'],
    approverOnly: false
}
