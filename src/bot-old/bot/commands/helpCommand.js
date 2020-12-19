const { MessageEmbed } = require ('discord.js');

module.exports.run = (client, message, args) => {

    message.delete().catch() // Delete the message that triggered this command (keeps the chat clean)

    const prefix = '*'

    if (args[0] && client.commands.has(args[0])) {

        const cmd = client.commands.get(args[0]);

        var cmdName = cmd.help.name.charAt(0).toUpperCase() + cmd.help.name.slice(1)

        var aliases = 'No aliases available for this command'

        if (cmd.help.aliases.lenght === 0) {
            aliases = 'No aliases available for this command'
        } else {
            aliases = cmd.help.aliases.join("\n")
        }

        const commandHelp = new MessageEmbed()
              commandHelp.setTitle(`${cmdName} command help`)
              commandHelp.setColor("RED")
              commandHelp.setDescription(`Here is some more info on the ${cmd.help.name} command`)
              commandHelp.addField('Default Prefix', prefix)
              commandHelp.addField('Command Name', cmd.help.name)
              commandHelp.addField('Command Description', cmd.help.description)
              commandHelp.addField('Command Category', cmd.help.category)
              commandHelp.addField('\u200b', '\u200b')
              commandHelp.addField('Command Examples', cmd.help.example)
              commandHelp.addField('Command Aliases', "``" + aliases + "``")
              commandHelp.setFooter(`Command Syntax: <> = Required | [] = Optional`)

              return message.channel.send(commandHelp)
    }

        const helpMessage = new MessageEmbed()
              helpMessage.setAuthor('Botrix Help', client.user.displayAvatarURL())
              helpMessage.setColor("RED")
              helpMessage.addField('Commands List', client.commands.map(cmd => "``" + cmd.help.name + "``"))
              helpMessage.setThumbnail(message.guild.iconURL({format: "png"}))
              helpMessage.setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL())
              
              message.channel.send(helpMessage)
}

module.exports.help = {
    name: 'help',
    category: 'Main Commands',
    aliases: ['helpme', 'halp', 'h', 'commands', 'cmds'],
    description: 'Sends you a list of all available commands OR more info on the command provided',
    example: '``help``\n``help <command_name>``'
}

module.exports.requirements = {
    userPerms: [],
    clientPerms: ['EMBED_LINKS'],
    approverOnly: false
}