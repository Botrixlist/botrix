const {Router} = require('express');
const request = require('request');
const unirest = require("unirest");
const servers = require('../../../models/servers');
const discord = require('discord.js');
const isHtml = require('is-html');
const config = require('../../../config.json')

var route = new Router();

route.post('/', async (req, res, next) => {
    let data = req.body;
    if(!req.user) return res.redirect('/login');
    if(data.short.length > 120) return res.json({"redirect": "/err?e=charLength"});
    if(isHtml(data.long) || isHtml(data.short)) return res.json({"redirect": "/err?e=htmlNotSupported"});
    let dupCheck = await servers.findOne({ guildID: data.id });
    if(dupCheck) return res.json({"redirect": "/err?e=serverOnList"})
    let botData = [];


    try{
       
        let client = req.app.get('client');

        let guild = req.app.get('serverClient').guilds.cache.get(data.id);

     
        if(!guild) return res.json({"redirect": "/err?e=botNotInGuild"});
        var emojiArr = [];
        var ownerArr = [];        
        const emojiList = guild.emojis.cache.map((e, x) => emojiArr.push(`https://cdn.discordapp.com/emojis/${e.id}.png`));



        ownerArr.push(req.user.id);

        if(data.owners){
            var owners = data.owners.split(' ');
            ownerArr.push(owners);

            let invaidUser = false;

            owners.forEach(ow => {
                let membersInv = req.app.get('serverClient').guilds.cache.get(config.GUILD_ID).members.cache.get(ow);
                if(!membersInv) invaidUser = true;
            });

            if(invaidUser == true) return res.json({"redirect": "/err?e=ownersNotInGuild"});

        }
        new servers({
            name: guild.name,
            guildID: guild.id,
            serverIco: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
            owners: ownerArr,
            invite: data.invite,
            emotes: emojiArr,
            short: data.short,
            long: data.long,
            webhook: data.webhook,
            tags: data.tags

        }).save();
        
        var e = new discord.MessageEmbed()
        .setTitle('New server added!')
        .setURL(`https://botrix.cc/servers/server/${guild.id}`)
        .setColor('#00ff00')
        .setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`)
        .addField(`Info`, `Added by: <@${ownerArr[0]}>`, true)
        .addField(`Guild Name`, `${guild.name}`, true)
        .addField(`Members:`, `${guild.memberCount}`, true);
      
        req.app.get('client').channels.cache.find(c => c.id === config.MOD_LOG).send(e)

        return res.json({"redirect": "/servers/server/" + guild.id});
    } catch (e) {
        console.log(e);
        return res.json({"redirect": "/err?e=" + e});
    }
})

module.exports = route;
