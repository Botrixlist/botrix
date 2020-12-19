const mongo = require ('mongoose');
const ms = require ('parse-ms');
const { MessageEmbed } = require ('discord.js');
const BotrixLogs = console.log;
const RateLimit = new Set()
const config = require('../../config.json');
/*HERE WE CONNECT TO AND CONFIGURE THE DB */
mongo.connect(config.MongoDbServer, { // ADD YOUR DB LINK HERE
    useNewUrlParser: true,
    useUnifiedTopology: true}, (err) => {
        if (err) return console.error(err);
        BotrixLogs('MONGO IS CONNECTED AND READY')
    })

/*HERE WE START THE MESSAGE EVENT */
    module.exports = (client, message) => {
        if (message.author.bot) return; // Ignore messages from bots (best)

        let prefix = 'b.';

        const args = message.content.split(/ +/g);

        const commands = args.shift().slice(prefix.length).toLowerCase();

        const cmd = client.commands.get(commands) || client.aliases.get(commands);

        if (!message.content.toLowerCase().startsWith(prefix)) return; // Ignore message if not triggered by prefix

        if (!cmd) return;

        if (!message.channel.permissionsFor(message.guild.me).toArray().includes('SEND_MESSAGES')) return; // Ignore if bot has no perms to send messages
        
        var  noAccess = new MessageEmbed()
        noAccess.setTitle('❌ Access Denied! ❌')
        noAccess.setDescription(`<@${message.author.id} This command is available to our Approvers only!`)
        noAccess.setFooter('© Botrix | 2020')
        noAccess.setTimestamp()

        if (cmd.requirements.approverOnly &&  !client.config.approvers.includes(message.author.id)) return message.channel.send(noAccess)

        var  noAccess2 = new MessageEmbed()
        noAccess.setAuthor('❌ Lacking Permissions! ❌', message.author.displayAvatarURL())
        noAccess.setDescription(`<@${message.author.id} You are missing the ${missingPerms(message.member, cmd.requirements.userPerms)} permission`)
        noAccess.setFooter('© Botrix | 2020')
        noAccess.setTimestamp()
        
        if (cmd.requirements.userPerms && !message.member.permissions.has(cmd.requirements.userPerms)) return message.channel.send(noAccess2)
        
        var  noAccess3 = new MessageEmbed()
        noAccess.setAuthor('❌ Lacking Permissions! ❌', message.author.displayAvatarURL())
        noAccess.setDescription(`<@${message.author.id} I am missing the ${missingPerms(message.guild.me, cmd.requirements.clientPerms)} permission`)
        noAccess.setFooter('© Botrix | 2020')
        noAccess.setTimestamp()
        
        if (cmd.requirements.clientPerms && !message.guild.me.permissions.has(cmd.requirements.clientPerms)) return message.channel.send(noAccess3)

        if (cmd.limits) {
            const current = client.limits.get(`${commands}-${message.author.id}`);
            if (!current) client.limits.set(`${commands}-${message.author.id}`, 1);
            else {
                if (current >= cmd.limits.RateLimit) {
                    let cooldown = ms(cmd.limits.cooldown - (Date.now() - RateLimit[message.author.id + commands].times));
                    var  rateMessage = new MessageEmbed()
                    noAccess.setAuthor('❌ RateLimited! ❌', message.author.displayAvatarURL())
                    noAccess.setDescription(`<@${message.author.id} You need to wait` + "``" + `${cooldown.hours}h ${cooldown.minutes}m ${cooldown.seconds}s` + "``")
                    noAccess.setFooter('© Botrix | 2020')
                    noAccess.setTimestamp()
                    return message.channel.send(rateMessage)
                }
                 /* SET AND ENABLE THE COMMAND RATELIMITS */
                client.limits.set(`${commands}-${message.author.id}`, current + 1);
                RateLimit.add(message.author.id + commands)
                RateLimit[message.author.id + commands] = {
                    times: Date.now()
                }
            }
            /* CHECK THE RATELIMIT TIMEOUT AND DELETE IT WHEN NEEDED*/
            setTimeout(() => {
                client.limits.delete(message.author.id + commands)
            }, cmd.limits.cooldown);
        }
        cmd.run(client, message, args)
      }

      /* CONTROL MISSING PERMISSIONS */
      const missingPerms = (member, perms) => {
          const missingPerms = member.permissions.missing(perms)
          .map(str => `\`${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

          return missingPerms.length > 1 ?
          `${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
          missingPerms[0];
      }