const { Collection, MessageEmbed, WebhookClient } = require("discord.js");
const chalk = require("chalk");
const cooldowns = new Collection();
const config = require("../../../../config.json");

module.exports = async (client, message) => {
  const prefix = config.prefix;

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  if (command.developerOnly && !config.OWNER_USERS.includes(message.author.id))
    return message.reply(
      "this command can only be used by authorized developers."
    );

  if (command.adminOnly && !config.ADMIN_USERS.includes(message.author.id))
    return message.reply(
      "this command can only be used by authorized approvers."
    );

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 10) * 1000;

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

  try {
    command.execute(message, args, client);
  } catch (error) {
    console.error(chalk.redBright("[Command Error]"), error);
  }
};
