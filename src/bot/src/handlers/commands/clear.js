module.exports = {
    name: "clear",
    async execute(message, args){
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
        return message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("Missing Bot Permissions")
            .setColor("#ff0000")
            .setDescription("**I** don't have the permission to delete messages.")
        );
        if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.hasPermission("MANAGE_MEMBERS")) return message.reply(`You Don't have Permission to clear a Channel!`);
        if(!args[1]) return message.reply('Invalid Arguments');
        if(isNaN(args[1]) === true) return message.reply('Please provide a message count between 1 and 100').then(e => setTimeout(async() => {e.delete()}, 3000));
        message.channel.bulkDelete(args[1]);
        message.reply(`🗑 Deleted ${args[1]} messages.`).then(d => {
            setTimeout(async() => {
                d.delete();
            }, 3000)
        })
    }
}
