const Discord = require("discord.js");
module.exports = {
  name: "kick",
  async execute(message, args, client) {
    args.shift();
    if (!message.member.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Missing Permissions")
          .setColor("#ff0000")
          .setDescription("You don't have the permission to kick members.")
      );
    if (!message.guild.me.hasPermission("KICK_MEMBERS"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Missing Bot Permissions")
          .setColor("#ff0000")
          .setDescription("**I** don't have the permission to kick members.")
      );
    let uid = args[0];
    if (!uid)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Missing Arguments")
          .setColor("#ff0000")
          .setDescription(
            "You must provide a mention or the ID of the user you want to kick."
          )
      );
    uid = uid.replace(/\D/g, "");
    if (!(uid.length > 0))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Invalid User ID")
          .setColor("#ff0000")
          .setDescription("The user ID can only contain numbers.")
      );
    if (uid.length != 18)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Invalid User ID")
          .setColor("#ff0000")
          .setDescription("A user ID is 18 characters long.")
      );
    if (uid == message.author.id)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Can't Kick Yourself")
          .setColor("#ff0000")
          .setDescription("You can't kick yourself.")
      );
    let user = await client.users.fetch(uid).catch(() => {});
    if (!user)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("User Not Found")
          .setColor("#ff0000")
          .setDescription("That user doesn't exist.")
      );
    let member = await message.guild.members.fetch(uid).catch(() => {});
    if (!member)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("User Not Server Member")
          .setColor("#ff0000")
          .setDescription("You cannot kick someone who isn't in this server.")
      );
    if (message.author.id != message.guild.ownerID) {
      if (user.id == message.guild.ownerID)
        return message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Permission ERROR")
            .setColor("ff0000")
            .setDescription("You are unable to kick the **server owner**.")
        );
      let pos = member.roles.highest.comparePositionTo(
        message.member.roles.highest
      );
      if (!(pos < 0))
        return message.channel.send(
          `That user is ${
            pos === 0
              ? "on the same role level as you."
              : `${pos} roles above you.`
          } Henceforth, you can't kick them.`
        );
    }

    pos = member.roles.highest.comparePositionTo(
      message.guild.me.roles.highest
    );

    if (!(pos < 0))
      return message.channel.send(
        `That user is ${
          pos === 0
            ? "on the same role level as **me**."
            : `${pos} roles above **me**.`
        } I couldn't kick them even if I wanted to.`
      );

    args.shift();
    let reason =
      args.join(" ").length > 0 ? args.join(" ") : "No reason provided.";
    let limit = 1800;
    if (reason.length > limit)
      return message.channel.send(
        `The reason cannot be longer than **${limit} characters**.`
      );
    let channelEmbed = new Discord.MessageEmbed()
      .setColor("ff0000")
      .setAuthor(
        `Successfully kicked ${user.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `**Reason**:\`\`\`\n${Discord.Util.cleanCodeBlockContent(
          reason
        )}\n\`\`\``
      );
    message.channel.send(channelEmbed).catch(() => {});

    let dateReadable = new Date(Date.now()).toLocaleString({ timeZone: "CET" });
    let dmEmbed = new Discord.MessageEmbed()
      .setAuthor(
        `You have been kicked from \`${message.guild.name}\``,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(
        `**Reason**:\`\`\`\n${Discord.Util.cleanCodeBlockContent(
          reason
        )}\n\`\`\``
      )
      .addField(
        `You've been kicked by ${message.author.tag}`,
        `and it happened at \`${dateReadable} (Central European Time)\``
      );
    member.send(dmEmbed).catch(() => {});
    member
      .kick(reason)
      .catch((e) => message.channel.send(`\`\`\`js\n${e}\n\`\`\``));
  },
};
