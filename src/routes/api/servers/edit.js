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
    if(data.short.length > 120) return res.json({"redirect": "/error?e=charLength"});
    if(isHtml(data.long) || isHtml(data.short)) return res.json({"redirect": "/error?e=htmlNotSupported"});
    let botData = [];

    try{

        let client = req.app.get('client');

        let guild = req.app.get('client').guilds.cache.get(data.id) || req.app.get('serverClient').guilds.cache.get(data.id);

        if(!guild) return res.json({"redirect": "/err?e=botNotInGuild"});
        var emojiArr = [];
        const emojiList = guild.emojis.cache.map((e, x) => emojiArr.push(`https://cdn.discordapp.com/emojis/${e.id}.png`));

        await servers.updateOne({guildID: guild.id},{$set: {
            name: guild.name,
            serverIco: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
            owners: req.user.id,
            invite: data.invite,
            emotes: emojiArr,
            short: data.short,
            long: data.long,
            webhook: data.webhook,
            tags: data.tags
        }});
        
        return res.json({"redirect": "/servers/server/" + guild.id});
    } catch (e) {
        console.log(e);
        return res.json({"redirect": "/err?e=" + e});
    }
})

module.exports = route;
