const Bots = require("../../../../models/bots");
const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  name: "botinfo",
  category: "Bots/Listed Bots",
  aliases: ["info"],
  description: "Shows you some information about the provided bot",
  example: "``*botinfo <@bot>``",
  async execute(message, args) {
    message.delete().catch(err => message.channel.send(`Error : \`${err}\``));

    const botUser = message.mentions.users.first();

    const noBot = new MessageEmbed()
      .setAuthor("Botrix", message.guild.iconURL())
      .setTitle("Oops, you made a mistake.")
      .setColor("RED")
      .setDescription("Please ping the bot you would like to get info about!")
      .setTimestamp()
      .setFooter(`Botrix | 2020`);

    if (!botUser || !botUser.bot) {
      return message.channel.send(noBot);
    }

    const botrixPing = new MessageEmbed()
      .setAuthor("Botrix", message.guild.iconURL())
      .setTitle("Pfft, You wish!")
      .setColor("RED")
      .setDescription("-_- Why would we let you do that?")
      .setFooter(`Botrix | 2020`)
      .setTimestamp();

    if (botUser.id === message.client.user.id) {
      return message.channel.send(botrixPing);
    }

    const theBot = await Bots.findOne({ botid: botUser.id });

    const notFound = new MessageEmbed()
      .setAuthor("Botrix", message.guild.iconURL())
      .setTitle("Hmm, You sure thats right?")
      .setColor("RED")
      .setDescription(
        "That bot wasnt found in our database, Please try again. If your bot is listed here and this issue continues please contact our staff for assistance."
      )
      .setTimestamp()
      .setFooter(`Botrix | 2020`);

    if (!theBot) {
      return message.channel.send(notFound);
    }

    const botMessage = new MessageEmbed()
      .setAuthor(theBot.username, theBot.logo, theBot.invite)
      .setColor("#fca311")
      .setDescription(theBot.description)
      .addField("Bot Prefix", theBot.prefix ? theBot.prefix : "Unknown", true)
      .addField("Bot Library", theBot.prefix ? theBot.library : "Unknown", true)
      .addField("Bot Owner(s)", `<@${theBot.owners[0]}>`, true)
      .addField("State", theBot.state, true)
      .addField("Certification status:", theBot.certified, true)
      .addField("Votes:", theBot.votes, true)
      .addField(
        "Stats",
        `Views: ${theBot.views} | Servers: ${theBot.servers}`,
        true
      )
      .addField(
        "Index:",
        `[Invite Bot](${theBot.invite}) | [Website](${theBot.website}) | [Vote](http://botrix.cc/vote/${theBot.botid})`
      )
      .setImage(theBot.bannerURL)
      .setFooter(`Registered on Botrix since: ${theBot.addedAt.toString()}`);
    return message.channel.send(botMessage);
  },
};
