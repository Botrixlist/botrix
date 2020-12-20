const discord = require('discord.js');

module.exports = {
    name: "voicemute",
    async execute(message, args, client) {
        if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MUTE_MEMBERS")) return message.reply(`You Don't have Permission!`);
      const muteUser = message.guild.member(
        message.mentions.users.first() || message.guild.members.cache.get(args[0])
      );
      const muteReason = args.join(" ").slice(23);
  
      if (muteUser.voice.serverMute) {
        return message.channel.send(
          "User is not in a voice channel or is already muted"
        );
      }
  
      muteUser.voice.setMute(true, "muteReason");
  
      muteUser.user.send(
        `You've been **Muted** from **${message.guild.name}**, Reason: **${muteReason}**`
      );
      message.channel.send(
        `**${muteUser.user.tag}** was successfully muted from the server. Reason: **${muteReason}**. I have also send a DM letting the person know.`
      );
    },
  };
