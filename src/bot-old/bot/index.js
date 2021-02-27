const { Client, MessageEmbed, Collection } = require ('../events/node_modules/discord.js.js');
const BotrixLogs = console.log;
const Bots = require ('@models/bots')

const client = new Client({
    disableMentions: 'everyone',
    disabledEvents: ["TYPING_START"]
});

/*HERE WE CALL THE CONFIG FILE (Set this and remove the "//" comment)*/ 
//const config = require ('PATH_TO_CONFIG')

/* HERE WE SET THE COMMANDS, ALIASES, LIMITS ETC */
client.commands = new Collection();
client.aliases = new Collection();
client.limits = new Collection();
client.config = config;

/* START READY EVENT */
client.on('ready', () => {
    BotrixLogs(`Botrix is online and ready!!`)
});

client.on('guildMemberAdd', member => {
    var role = member.guild.roles.cache.find(role => role.name == "Member")
    member.roles.add(role);
    let Member_add = require('../events/guildMemberAdd.js');
    Member_add.run(client, member)
});

client.on('guildMemberRemove', member => {
    let Member_remove = require('../events/guildMemberRemove.js');
    Member_remove.run(client, member)
});

/* HERE WE SET THE PATH TO COMMAND STRUCTURES AND RUN THEM ON READY */
const command = require ('../structures/command');
command.run(client);

/* HERE WE SET THE PATH TO EVENTS STRUCTURES AND RUN THEM ON READY */
const events = require ('../structures/event');
events.run(client)


client.login(config.token);
