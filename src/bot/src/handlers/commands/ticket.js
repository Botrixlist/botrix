const { MessageEmbed } = require("discord.js");
const config = require('../../../../config.json')
module.exports = {
  name: "ticket",
  aliases: ["tc", "issue"],
  example: "*ticket",
  async execute(message, args) {
  try{
                  if(message.guild.channels.cache.find(ch => ch.name === `ticket-${message.author.tag}`)) return message.channel.send('You already have a ticket open.')
            const Channel = await message.guild.channels.create(`ticket-${message.author.tag}`, {
                type: `text`,
                permissionOverwrites: [
                    {
                        id: "788790991267561522",
                        allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `READ_MESSAGE_HISTORY`]
                    },
                    {
                        id: message.author.id,
                        allow: [`VIEW_CHANNEL`, `SEND_MESSAGES`, `READ_MESSAGE_HISTORY`]
                    },
                    {
                        id: message.guild.id,
                        deny: [`VIEW_CHANNEL`]
                    }
                ]
            })
            message.react('👍');
                await Channel.send(`${message.author}` , new MessageEmbed()
                .setTitle('Ticket Created Successfully!')
                .setDescription(`Please wait for the staff team to respond. You have to at least wait for \`2-3 minutes\`. Remember if you opened the ticket for no reason. There can be a mute for you for solid \`4\` hours or maybe a \`kick\` or \`ban\` too. Be as much descriptive you can be, so that staff team can get deep into the issue and help you.`)
                .setColor('#2f3136'))
      }catch(err){
        message.channel.send(`Oops! looks like an error occurred : \`${err.message}\``)
    }
  },
};
