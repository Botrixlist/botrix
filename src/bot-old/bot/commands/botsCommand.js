const Bots = require("../../../models/bots");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  message.delete().catch();

  const user = message.mentions.users.first() || message.author;

  if (user.bot) return;

  let msg = "";
  let msg2 = "";
  let msg3 = "";

  let bots = await Bots.find(
    { owners: user.id, state: "verified" },
    { _id: false }
  );
  let bots2 = await Bots.find(
    { owners: user.id, state: "unverified" },
    { _id: false }
  );
  let bots3 = await Bots.find(
    { owners: user.id, state: "denied" },
    { _id: false }
  );

  if (bots.length === 0) {
    msg = "This user has no bots that have been Approved on our list.";
  } else {
    bots.forEach((bot) => {
      msg += `<@${bot.botid}>\n`;
    });
  }

  if (bots2.length === 0) {
    msg2 = "This user has no bots that are Pending Approval on our list";
  } else {
    bots2.forEach((bot) => {
      msg2 += `<@${bot.botid}>\n`;
    });
  }

  if (bots3.length === 0) {
    msg3 = "This user has no bots that have been Denied on our list";
  } else {
    bots3.forEach((bot) => {
      msg3 += `<@${bot.botid}>\n`;
    });
  }

  message.channel
    .send(
      new MessageEmbed()
        .setTitle(`${user.username}#${user.discriminator}'s bots`)
        .setColor("RED")
        .addField("Approved Bots", msg)
        .addField("Pending Bots", msg2)
        .addField("Denied Bots", msg3)
        .setFooter("Note: Denied bots can be Resubmitted")
    )
    .setTimestamp();
};

module.exports.help = {
  name: "bots",
  category: "Bots/Listed Bots",
  aliases: ["user-bots"],
  description: "Provides a list of ALL bots a user has submitted",
  example: "``bots <@user>``",
};

module.exports.requirements = {
  userPerms: [],
  clientPerms: ["EMBED_LINKS"],
  approverOnly: false,
};
