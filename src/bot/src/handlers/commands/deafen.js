const discord = require('discord.js');

module.exports = {
    name: "deafen",
    description: "Deafen a user",
    async execute(message, args, client) {
      if (!message.guild.me.hasPermission("DEAFEN_MEMBERS"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Missing Bot Permissions")
          .setColor("#ff0000")
          .setDescription("I Don't Have Permissions To Deafen Users.")
      );
        if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MUTE_MEMBERS")) return message.reply(`You Don't have Permission!`);
      const deafenUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.cache.get(args[0])
      );
      const deafenReason = args.join(" ").slice(23);
  
      if (deafenUser.voice.serverDeaf) {
        return message.channel.send(
          "User is not in a voice channel or isn't deafened"
        );
      }
  
      deafenUser.voice.setDeaf(true, "deafenReason");
  
      deafenUser.user.send(
        `You've been **Deafenned** from **${message.guild.name}**, Reason: **${deafenReason}**`
      );
      message.channel.send(
        `${deafenUser} was successfully deafenned from the server. Reason: **${deafenReason}**. I have also send a DM letting the person know.`
      );
    },
  };
