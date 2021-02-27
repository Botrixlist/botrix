const discord = require("discord.js");
const config = require("../../../../config.json");

const invites = {};

module.exports = (client, member) => {
  if (member.guild.id == config.GUILD_ID) {
    if (member.user.bot) {
      let unverifiedRole = client.guilds.cache
        .get(config.GUILD_ID)
        .roles.cache.find((r) => r.id === config.UNVERIFIED_ROLE);
      member.roles.add(unverifiedRole);
    } else {
      let unverifiedRole_user = client.guilds.cache
        .get(config.GUILD_ID)
        .roles.cache.find((r) => r.id === config.BOT_DEVELOPER_ROLE_ID);
      member.roles.add(unverifiedRole_user);
     const welcomeEmbed = new discord.MessageEmbed()
       .setTitle("Welcome to Botrix!")
       .setDescription(
          `Botrix is the easiest way to list, advertise and grow your discord server and/or bot on discord!\n\n[List your bot](https://botrix.cc/add) | [Browse our selection](https://botrix.cc/discover)\n\nWe hope you enjoy your stay!`
        )
        .setFooter("-Botrix Team")
        .setColor("#fca311")
        .setTimestamp();
      member.send(welcomeEmbed); 
    }

    const serverCount = member.guild.memberCount;
    const channele = member.guild.channels.cache.find(
      (ch) => ch.id === config.greeting_chan
    );

/*    const Embed = new discord.MessageEmbed()
      .setColor("#fca311")
      .setAuthor(member.user.tag, member.user.displayAvatarURL())
      .setDescription(
        `Welcome to the server, we hope you enjoy your stay.\n\n` +
          "We now have " +
          serverCount +
          " members in our guild.\n\nIf you have any questions, please reach out in any of our related channels."
      )
      .setFooter("Botrix - Copyright 2020", member.guild.iconURL())
      .setTimestamp();
    channele.send(Embed); */
  }
};
