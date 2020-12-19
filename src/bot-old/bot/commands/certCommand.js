const bots = require("../../../models/bots");
const servers = require("../../../models/servers");
const config = require("../../../config.json");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
  message.delete().catch();
  let bot = message.mentions.members.first();
  if (!config.ADMIN_USERS.includes(message.author.id))
    return message.channel.send("Sorry, but you are not an admin of botrix");

  const unknownErr = new MessageEmbed();
  unknownErr.setTitle("Whoops, Something went wrong on our end..");
  unknownErr.setColor("RED");
  unknownErr.setDescription("An error has occured, please check logs.");
  unknownErr.setTimestamp();
  unknownErr.setFooter("© Botrix | 2020");

  const error = new MessageEmbed();
  error.setTitle("This bot is not in the cert queue!");
  error.setColor("RED");
  error.setDescription(
    'This bot/guild does not exist or does not have a "pending" status'
  );
  error.setTimestamp();
  error.setFooter("© Botrix | 2020");

  const success = new MessageEmbed()
    .setTitle(`${bot ? bot.user.username : args[0]} has been certified`)
    .setColor("RED")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/748340693881192484/760017137351000134/cert-badge.png"
    )
    .setTimestamp();

  let bots_ = await bots.findOne(
    { botid: getUserFromMention(args[0]) },
    { certified: "pending" }
  );

  let servers_ = await servers.findOne(
    { guildID: args[0] },
    { certified: "pending" }
  );
  console.log(`${bot ? bot.user.id : args[0]}`);

  if (!bots_ && !servers_) return message.channel.send(error);

  try {
    bots_
      ? await bots.updateOne(
          { botid: getUserFromMention(args[0]) },
          { $set: { certified: "approved" } }
        )
      : await servers.updateOne(
          { guildID: args[0] },
          { $set: { certified: "approved" } }
        );

    client.channels.cache.find((c) => c.id === config.CERT_LOGS).send(success);
    client.guilds.cache
      .get(config.GUILD_ID)
      .member(bot ? bots_.owners[0] : servers_.owners[0])
      .send(success);
  } catch (e) {
    message.channel.send(unknownErr);
  }
};

module.exports.help = {
  name: "cert",
  category: "Developer/mods",
  aliases: [],
  description: "certification command",
  example: "cert @bot/guildID",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: ["EMBED_LINKS"],
  approverOnly: false,
};

function getUserFromMention(mention) {
  if (!mention) return;

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return mention;
  }
}
