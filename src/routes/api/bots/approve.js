const {Router} = require('express');
const request = require('request');
const unirest = require("unirest");
const discord = require('discord.js');
const bots = require('../../../models/bots');
const isHtml = require('is-html');
const config = require('../../../config.json')

var route = new Router();

route.get('/:id', async (req, res, next) => {
    if(!req.user) return res.redirect('/login');

    if(!config.ADMIN_USERS.includes(req.user.id)) res.send(404);

    let bot = await bots.findOne({ botid: req.params.id });

    if(bot.length == 0) return res.send(404);

    await bots.updateOne({ botid: req.params.id }, {$set: { state: 'verified' }});

    var e = new discord.MessageEmbed()
    .setTitle('Bot Approved~!')
    .setURL(`https://botrix.cc/bots/${bot.botid}`)
    .setColor('#00ff00')
    .setThumbnail(bot.icon)
    .addField(`Info`, `**Approved by: <@${req.user.id}>** \n  Owner: <@${bot.owners[0]}> \n Bot: <@${bot.botid}> \n Prefix: ${bot.prefix}`, true);
    req.app.get('client').channels.cache.find(c => c.id === config.MOD_LOG).send(e)

 
    let client = req.app.get('client')

    let unverifiedRole = client.guilds.cache.get(config.GUILD_ID).roles.cache.find(r => r.id === config.UNVERIFIED_ROLE)
    let verifiedRole = client.guilds.cache.get(config.GUILD_ID).roles.cache.find(r => r.id === config.VERIFIED_ROLE)

    let unverifiedRole_user = client.guilds.cache.get(config.GUILD_ID).roles.cache.find(r => r.id === config.BOT_DEVELOPER_ROLE_ID)
    let verifiedRole_user = client.guilds.cache.get(config.GUILD_ID).roles.cache.find(r => r.id === config.BOT_DEVELOPER_ROLE_ID_VERIFIED)

    let member = client.guilds.cache.get(config.GUILD_ID).member(bot.owners[0]);
    member.roles.remove(unverifiedRole_user);
    member.roles.add(verifiedRole_user);

    let botMember = client.guilds.cache.get(config.GUILD_ID).member(bot.botid);
    botMember.roles.remove(unverifiedRole);
    botMember.roles.add(verifiedRole);
    member.send(e);
    res.redirect('/restricted/mod')
})

module.exports = route;
