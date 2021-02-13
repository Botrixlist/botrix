const Bots = require("../../../../models/bots");
const { MessageEmbed } = require("discord.js");
const config = require("../../../../config.json");
const { execute } = require("./count");

module.exports = {
  name: "queue",
  category: "Bots/Listed Bots",
  aliases: ["q", "pending"],
  description: "Provides a list of bots awaiting our approval",
  example: "``queue``",
  async execute(message, args) {
    message.delete().catch();

    let msg = "";
    let bots = await Bots.find({ state: "unverified" }, { _id: false });

    if (bots.length === 0) {
      msg =
        "There are currently no bots in our Queue, You can add one [here](https://botrix.cc/add/)";
    } else {
      bots.forEach((bot) => {
        msg += `<@${bot.botid}> | [Invite](https://discord.com/oauth2/authorize?client_id=${bot.botid}&scope=bot&guild_id=${config.GUILD_ID}&permissions=0) : [Page](https://botrix.cc/bots/${bot.botid})\n \n`;
      });
    }

    let embed = new MessageEmbed()
      .setAuthor(`Botrix`, message.guild.iconURL())
      .setColor("GREEN")
      .setThumbnail(message.author.displayAvatarURL())
      .setTitle(`Bots in Queue:`)
      .setDescription(msg)
      .addField(
        "Want more info?",
        "Run *info @bot | <@botid> to get info about a bot."
      )
      .setTimestamp()
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.displayAvatarURL()
      );

    message.channel.send(embed);
  },
};
