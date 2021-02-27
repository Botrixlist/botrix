const mongo = require("mongoose");
const ms = require("parse-ms");
const { MessageEmbed, Collection } = require("discord.js");
const BotrixLogs = console.log;
const cooldowns = new Collection();
const config = require("../../config.json");

/*HERE WE CONNECT TO AND CONFIGURE THE DB */
mongo.connect(
  config.MongoDbServer,
  {
    // ADD YOUR DB LINK HERE
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    BotrixLogs("MONGO IS CONNECTED AND READY");
  }
);

/*HERE WE START THE MESSAGE EVENT */
module.exports = (client, message) => {
  if (message.author.bot) return; // Ignore messages from bots (best)

  let prefix = "*";

  const args = message.content.split(/ +/g);

  const commands = args.shift().slice(prefix.length).toLowerCase();

  const cmd = client.commands.get(commands) || client.aliases.get(commands);

  if (!message.content.toLowerCase().startsWith(prefix)) return; // Ignore message if not triggered by prefix

  if (!cmd) return;

  if (
    !message.channel
      .permissionsFor(message.guild.me)
      .toArray()
      .includes("SEND_MESSAGES")
  )
    return; // Ignore if bot has no perms to send messages

  var noAccess = new MessageEmbed();
  noAccess.setTitle("❌ Access Denied! ❌");
  noAccess.setDescription(
    `<@${message.author.id} This command is available to our Approvers only!`
  );
  noAccess.setFooter("© Botrix | 2020");
  noAccess.setTimestamp();
  noAccess.setColor("#fca311");

  if (
    cmd.requirements.approverOnly &&
    !client.config.approvers.includes(message.author.id)
  )
    return message.channel.send(noAccess);

  var noAccess2 = new MessageEmbed();
  noAccess2.setAuthor(
    "❌ Lacking Permissions! ❌",
    message.author.displayAvatarURL()
  );
  noAccess2.setDescription(
    `<@${message.author.id} You are missing the ${missingPerms(
      message.member,
      cmd.requirements.userPerms
    )} permission`
  );
  noAccess2.setFooter("© Botrix | 2020");
  noAccess2.setTimestamp();
  noAccess2.setColor("#fca311");

  if (
    cmd.requirements.userPerms &&
    !message.member.permissions.has(cmd.requirements.userPerms)
  )
    return message.channel.send(noAccess2);

  var noAccess3 = new MessageEmbed();
  noAccess3.setAuthor(
    "❌ Lacking Permissions! ❌",
    message.author.displayAvatarURL()
  );
  noAccess3.setDescription(
    `<@${message.author.id} I am missing the ${missingPerms(
      message.guild.me,
      cmd.requirements.clientPerms
    )} permission`
  );
  noAccess3.setFooter("© Botrix | 2020");
  noAccess3.setTimestamp();
  noAccess3.setColor("#fca311");

  if (
    cmd.requirements.clientPerms &&
    !message.guild.me.permissions.has(cmd.requirements.clientPerms)
  )
    return message.channel.send(noAccess3);

  /* COMMAND COOLDOWN HANDLING */
  if (!cooldowns.has(cmd.name)) {
    cooldowns.set(cmd.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(cmd.name);
  const cooldownAmount = (cmd.cooldown || 10) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      let embed = new MessageEmbed()
        .setAuthor(
          `Botrix`,
          "https://media.discordapp.net/attachments/747602999035166810/757838697080160356/logo_wo_background.png"
        )
        .setDescription(
          `You are currently on command cooldown, please wait \`${timeLeft}\` more seconds before reusing this command.`
        )
        .setTimestamp()
        .setColor("#fca311")
        .setFooter(
          `Requested by ${message.author.username}`,
          message.author.displayAvatarURL()
        );
      return message.reply(embed);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  cmd.run(client, message, args);
};

/* CONTROL MISSING PERMISSIONS */
const missingPerms = (member, perms) => {
  const missingPerms = member.permissions.missing(perms).map(
    (str) =>
      `\`${str
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b(\w)/g, (char) => char.toUpperCase())}\``
  );

  return missingPerms.length > 1
    ? `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}`
    : missingPerms[0];
};
