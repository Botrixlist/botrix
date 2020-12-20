const discord = require('discord.js');

module.exports = {
    name: "undeafen",
    description: "Undeafen a user from voice channel",
    category: "admin",
    botPermissions: ["DEAFEN_MEMBERS"],
    memberPermissions: ["DEAFEN_MEMBERS"],
    async execute(message, args, client) {
      if (!message.guild.me.hasPermission("DEAFEN_MEMBERS"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Missing Bot Permissions")
          .setColor("#ff0000")
          .setDescription("I Don't Have Permissions To Undeafen Users.")
      );
        if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MUTE_MEMBERS")) return message.reply(`You Don't have Permission!`);
      const undeafenUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.cache.get(args[0])
      );
  
      if (!undeafenUser.voice.serverDeaf) {
        return message.channel.send(
          "User is not in a voice channel or isn't deafened"
        );
      }
  
      undeafenUser.voice.setDeaf(false, "undeafenReason");
  
      undeafenUser.user.send(
        `You've been **undeafened** from **${message.guild.name}**`
      );
      message.channel.send(
        `**${undeafenUser.user.tag}** was successfully undeafened from the server. I have also send a DM letting the person know.`
      );
    },
  };
