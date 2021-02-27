
const discord = require('discord.js');
const moment = require('moment')
const config = require("../../config.json");

const invites = {};

module.exports = (client, member) => {    
    let channelID = "761078313623093269";
    const serverCount = member.guild.memberCount;
    const channele = member.guild.channels.cache.find(ch => ch.id === channelID);
    var currentDateAndTime = new Date().toLocaleString(); //"8/5/2019, 2:30:41 PM"

        const Embed = new discord.MessageEmbed()
            .setColor('#fca311')
            .setDescription(`Welcome to the server <@${member.user.id}>`)

            .setTitle("Member Left")
            .setDescription(`<@${member.user.id}>(${member.user.tag}) has left the server \n`)
            .addField("Joined on", `${moment.utc(member.joinedAt).format('DD/MM/YY')}`)
            .addField("Left on", `${currentDateAndTime}`)
            .setTimestamp()
            .setFooter(serverCount + ' members left')
            .setAuthor("Botrix Logging", //and this its profile pic)
            )
        //member.guild.channels.cache.find(ch => ch.name.startsWith("Server Count: ")).setName(`Server Count: ${serverCount}`);

        channele.send(Embed);  
        
        //*eval client.emit('guildMemberAdd', message.member)
}


