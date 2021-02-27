const Bots = require("../../../models/bots");
const { MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");

module.exports.run = async (client, message, args) => {
  message.delete().catch();

  const botUser = message.mentions.users.first();

  const noBot = new MessageEmbed();
  noBot.setTitle("Whoops, You missed something!");
  noBot.setColor("RED");
  noBot.setDescription("Please ping the bot you would like to get info about!");
  noBot.setTimestamp();
  noBot.setFooter("© Botrix | 2020");

  if (!botUser || !botUser.bot) return message.channel.send(noBot);

  const botrixPing = new MessageEmbed();
  botrixPing.setTitle("Pfft, You wish!!");
  botrixPing.setColor("RED");
  botrixPing.setDescription("-_- Why would we let you do that?");
  botrixPing.setFooter("© Botrix | 2020");
  botrixPing.setTimestamp();

  if (botUser.id === message.client.user.id)
    return message.channel.send(botrixPing);

  const theBot = await Bots.findOne({ botid: botUser.id });

  const notFound = new MessageEmbed();
  notFound.setTitle("Hmm, You sure thats right?");
  notFound.setColor("RED");
  notFound.setDescription(
    "That bot wasnt found in our list, Please try again. If your bot is listed here and this issue continues please contact our staff for assistance."
  );
  notFound.setTimestamp();
  notFound.setFooter("© Botrix | 2020");

  if (!theBot) return message.channel.send(notFound);

  const botMessage = new MessageEmbed();
  botMessage.setAuthor(theBot.username, theBot.logo, theBot.invite);
  botMessage.setColor("#fca311");
  botMessage.setDescription(theBot.description);
  botMessage.addField(
    "Bot Prefix",
    theBot.prefix ? theBot.prefix : "Unknown",
    true
  );
  botMessage.addField(
    "Bot Library",
    theBot.prefix ? theBot.library : "Unknown",
    true
  );
  botMessage.addField("Bot Owner(s)", `<@${theBot.owners[0]}>`, true);
  botMessage.addField("State", theBot.state, true);
  botMessage.addField("Certification status:", theBot.certified);
  botMessage.addField(
    "Stats",
    `Views: ${theBot.views} | Servers: ${theBot.servers}`
  );
  botMessage.addField(
    "Index:",
    `[Invite Bot](${theBot.invite}) | [Website](${theBot.website}) | [Vote](http://botrix.cc/vote/${theBot.botid})`
  );
  botMessage.setImage(theBot.bannerURL);
  botMessage.setFooter(
    `Registered on Botrix since: ${theBot.addedAt.toString()}`
  );
  botMessage.setTimestamp();

  message.channel.send(botMessage);
};

module.exports.help = {
  name: "botinfo",
  category: "Bots/Listed Bots",
  aliases: ["info"],
  description: "Shows you some information about the provided bot",
  example: "``botinfo <@bot>``",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: ["EMBED_LINKS"],
  approverOnly: false,
};
