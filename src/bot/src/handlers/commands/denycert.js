const bots = require("../../../../models/bots");
const config = require("../../../../config.json");
const servers = require("../../../../models/servers");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { execute } = require("./count");

module.exports = {
  name: "denycert",
  category: "Developer/mods",
  description: "certification denial command",
  example: "*denycert @bot",
  adminOnly: true,
  async execute(message, args) {
    message.delete().catch();
    let bot = message.mentions.members.first();

    let bots_ = await bots.findOne({
      botid: bot ? bot.user.id : args[0],
      certified: "pending",
    });

    let servers_ = await servers.findOne({
      guildID: args[0],
      certified: "pending",
    });

    if (!bots_ && !servers_) {
      const error = new MessageEmbed()
        .setAuthor("Botrix", message.guild.iconURL())
        .setTitle("This bot is not in the cert queue!")
        .setColor("RED")
        .setDescription(
          'This bot does not exist or does not have a "pending" status'
        )
        .setTimestamp()
        .setFooter("© Botrix | 2020");
      return message.channel.send(error);
    }

    try {
      bot
        ? await bots.updateOne(
            { botid: bot.user.id },
            { $set: { certified: "unverified" } }
          )
        : await servers.updateOne(
            { guildID: args[0] },
            { $set: { certified: "unverified" } }
          );

      const success = new MessageEmbed()
        .setAuthor("Botrix", message.guild.iconURL())
        .setTitle(
          `${
            bot ? bot.user.username : args[0]
          } has been declined for Certification.`
        )
        .setColor("RED")
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
        .setTitle("Whoops, Something went wrong on our end..")
        .setColor("RED")
        .setDescription("An error has occured, please check logs.")
        .setTimestamp()
        .setFooter("© Botrix | 2020");
      message.channel.send(e, unknownErr);
      console.error(`Deny Cert Error: ${e}`);
    }
  },
};
