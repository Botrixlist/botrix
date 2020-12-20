const Discord = require("discord.js");
module.exports = {
  name: "unban",
  async execute(message, args, client) {
    args.shift();
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Missing Permissions")
          .setColor("#ff0000")
          .setDescription("You don't have the permission to (un)ban members.")
      );
    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Missing Bot Permissions")
          .setColor("#ff0000")
          .setDescription("**I** don't have the permission to (un)ban members.")
      );
    let uid = args[0];
    if (!uid)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Missing Arguments")
          .setColor("#ff0000")
          .setDescription(
            "You must provide a mention or the ID of the user you want to unban."
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
          .setTitle("Can't Unban Yourself")
          .setColor("#ff0000")
          .setDescription("You are most definitely not banned.")
      );
    if (uid == message.guild.ownerID)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("Permission Error")
          .setColor("ff0000")
          .setDescription(
            "You couldn't have banned the **server owner** in the first place."
          )
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
    if (member)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("User Is A Server Member")
          .setColor("ff0000")
          .setDescription(
            "That user is not banned. In fact, they *are* in this server."
          )
      );
    let ban = await message.guild.fetchBan(uid).catch(() => {});
    if (!ban)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("User Not Banned")
          .setColor("ff0000")
          .setDescription("That user is not banned.")
      );

    args.shift();
    let reason =
      args.join(" ").length > 0 ? args.join(" ") : "No reason provided.";
    let limit = 1800;
    if (reason.length > limit)
      return message.channel.send(
        `The reason cannot be longer than **${limit} characters**.`
      );

    message.guild.members.unban(user, reason).catch(console.error);
    let channelEmbed = new Discord.MessageEmbed()
      .setColor("ff0000")
      .setAuthor(
        `Successfully unbanned ${user.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setThumbnail(user.displayAvatarURL({ dynamic: true }));
    message.channel.send(channelEmbed).catch(() => {});
  },
};
