const { MessageEmbed } = require("discord.js");
const config = require('../../../../config.json')

module.exports = {
  name: "uptime",
  description: "Uhh, what else would this be for?",
  adminOnly: true,
  aliases: ["ut"],
  example: "*uptime",
  async execute(message, args, client) {
  try{
        const nm = await message.channel.send("\`Calculating....\`")
        let totalSeconds = (message.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let upime = `${days} day(s), ${hours} hour(s), ${minutes} minute(s) and ${seconds} second(s)`;
        let upup = new MessageEmbed()
        upup.setColor(0x2f3136)
        upup.setDescription(`\`\`\`js\nUptime : ${upime}\`\`\``)
        return nm.edit("\t", upup)
      }catch(err){
        message.channel.send(`Oops! looks like an error occurred : \`${err.message}\``)
    }
  },
};
