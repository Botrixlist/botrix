const {Router} = require('express');
const request = require('request');
const unirest = require("unirest");
const discord = require('discord.js');
const bots = require('../../../models/bots');
const isHtml = require('is-html');
const config = require('../../../config.json')

var route = new Router();

route.post('/:id', async (req, res, next) => {
    let data = req.body;

    let bot = await bots.findOne({ botid: req.params.id });

    if(!req.user) return res.json({"redirect": "/login"});

    if(!config.ADMIN_USERS.includes(req.user.id) || !bot.owners.includes(req.user.id)) res.send(404);


    if(bot) return res.send(404);

    await bots.deleteOne({ botid: req.params.id });
    var e = new discord.MessageEmbed()
    .setTitle('Bot Deleted')
    .setColor('#ff0000')
    .addField(`Bot info`, `**Bot: <@${req.params.id}>** \n **Mod: <@${req.user.id}>** \n **Reason: ${data.reason} **`);
    let member = req.app.get('client').guilds.cache.get('750070458686373899').member(req.user.id).send(e);
    req.app.get('client').channels.cache.find(c => c.id === '750070459118387240').send(e)
    return res.json({"statys": "success"});
})

module.exports = route;
