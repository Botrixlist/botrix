const { MessageEmbed } = require("discord.js");
const config = require('../../../../config.json')
module.exports = {
  name: "end",
  aliases: ["close"],
  example: "*end",
  description: "Closes a ticket",
  async execute(message, args) {
  try{
            if(!message.member.hasPermission(["MANAGE_MESSAGES"])) return message.reply("You can\'t close the ticket. Please take the help of an admin or a mod");
            if (!message.channel.name.includes('ticket-')) return message.channel.send('You cannot use that here!');
            await message.channel.send('This ticket will be deleted in \`10 seconds\`')
            setTimeout(async () => {
                await message.channel.delete();
            }, 10000);
     }catch(err){
        message.channel.send(`Oops! looks like an error occurred : \`${err.message}\``)
    }
  },
};
