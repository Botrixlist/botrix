const {Router} = require('express');
const request = require('request');
const unirest = require("unirest");
const servers = require('../../models/servers');
const discord = require('discord.js');
const isHtml = require('is-html');
const config = require('../../config.json')

var route = new Router();

route.get('/:id', async (req, res, next) => {
    if(!req.user) return res.redirect('/login');
    let member = req.app.get('client').guilds.cache.get(config.GUILD_ID).member(req.user.id) || req.app.get('serverClient').guilds.cache.get(config.GUILD_ID).member(req.user.id);
    let guild = req.app.get('client').guilds.cache.get(req.params.id) || req.app.get('serverClient').guilds.cache.get(req.params.id);
    var emojiArr = [];
    const emojiList = guild.emojis.cache.map((e, x) => emojiArr.push(`https://cdn.discordapp.com/emojis/${e.id}.png`));
    if(!member) return res.redirect('/error?err=usernotinguild');
  

    let serverData = await servers.findOne({ guildID: req.params.id });

    if(!serverData) return res.redirect('/error?err=guildNotOnList');

    if(!serverData.owners.includes(req.user.id)) return res.redirect('/servers');

    let data = {
        user: req.user,
        guild: guild,
        emoji: emojiArr,
        data: serverData
    }

    res.render('servers/editForm', data); 
});


module.exports = route;
