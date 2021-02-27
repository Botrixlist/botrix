const { MessageEmbed } = require("discord.js");
const config = require('../../../../config.json')

module.exports = {
  name: "approval",
  adminOnly: true,
  aliases: ["app"],
  example: "*approval",
  description: "Displays a FAQ about approval.",

  async execute(message, args) {
    try {
      if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
      message.delete();
      let rule3 = new MessageEmbed()
        .setTitle("#FAQ - (How much does it take for my Bot to get approved?)")
        .setColor("#2f3136")
        .setFooter(
          `Requested By ${message.author.tag}`,
          message.author.displayAvatarURL()
        )
        .setDescription(`\`\`\`fix\nWe are a growing community. Currently, It takes us 1-2 hours or 1-2 days or even 40 minutes to approve a bot.
But as we keep growing everyday, we get new bots in the queue and it depends, whether there's a lot or not.
We promise, to approve your bot as soon as possible, we keep trying everyday. If it takes more than
2 weeks, You can surely contact an admin or a moderator about this. Remember not to spam their DMs, because
they need time to respond too, like you.\`\`\``);
      message.channel.send(rule3);
    } catch (err) {
      message.channel.send(
        `Oops! looks like an error occurred : \`${err.message}\``
      );
    }
  },
};
