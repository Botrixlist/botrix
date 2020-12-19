const bots = require("../../../../models/bots");
const servers = require("../../../../models/servers");
const config = require("../../../../config.json");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { execute } = require("./botinfo");

module.exports = {
  name: "cert",
  category: "Developer/mods",
  adminOnly: true,
  description: "Certification command.",
  example: "*cert @bot/guildID",
  async execute(message, args, client) {
    message.delete().catch();

    let bot = message.mentions.members.first();

    if (!bot) {
      const nomention = new MessageEmbed()
        .setAuthor("Botrix", message.guild.iconURL())
        .setTitle("Whoops, Something went wrong on our end.")
        .setColor("RED")
        .setDescription(
          "To move forward, please rerun this command mentioning a specific bot."
        )
        .setTimestamp()
        .setFooter("© Botrix | 2020");
      return message.reply(nomention);
    }

    let bots_ = await bots.findOne(
      { botid: getUserFromMention(args[0]) },
      { certified: "pending" }
    );

    let servers_ = await servers.findOne(
      { guildID: args[0] },
      { certified: "pending" }
    );
    console.log(`${bot ? bot.user.id : args[0]}`);

    if (!bots_ && !servers_) {
      const error = new MessageEmbed()
        .setAuthor("Botrix", message.guild.iconURL())
        .setTitle("This bot is not in the cert queue!")
        .setColor("RED")
        .setDescription(
          'This bot/guild does not exist or does not have a "pending" status'
        )
        .setTimestamp()
        .setFooter("© Botrix | 2020");
      return message.channel.send(error);
    }

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

      const success = new MessageEmbed()
        .setAuthor("Botrix", message.guild.iconURL())
        .setTitle(`${bot ? bot.user.username : args[0]} has been certified`)
        .setColor("RED")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/748340693881192484/760017137351000134/cert-badge.png"
        )
        .setTimestamp();
      message.guild.channels.cache
        .find((c) => c.id === config.CERT_LOGS)
        .send(success);
      message.client.guilds.cache
        .get(config.GUILD_ID)
        .member(bot ? bots_.owners[0] : servers_.owners[0])
        .send(success);
    } catch (e) {
      const unknownErr = new MessageEmbed()
        .setAuthor("Botrix", message.guild.iconURL())
        .setTitle("Whoops, Something went wrong on our end.")
        .setColor("RED")
        .setDescription("An error has occured, please check logs.")
        .setTimestamp()
        .setFooter("© Botrix | 2020");
      message.channel.send(e, unknownErr);
    }
  },
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
