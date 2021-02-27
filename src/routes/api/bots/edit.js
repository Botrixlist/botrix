const {Router} = require('express');
const request = require('request');
const unirest = require("unirest");
const bots = require('../../../models/bots');
const discord = require('discord.js');
const URL = require("url").URL;
const isHtml = require('is-html');
const config = require('../../../config.json')
const stringIsAValidUrl = (s) => {
    try {
      new URL(s);
      return true;
    } catch (err) {
      return false;
    }
  };


var route = new Router();

route.post('/:id', async (req, res, next) => {
    let data = req.body;
    if(!req.user) return res.redirect('/login');
    if(data.short.length > 120) return res.json({"redirect": "/error?e=charLength"});
    if(isHtml(data.long) || isHtml(data.short)) return res.json({"redirect": "/error?e=htmlNotSupported"});

    let botData = [];

    const bot = await bots.findOne({ botid: data.id }, { _id: false })

    if(!bot.owners.includes(req.user.id)) return res.status(404).end();
    if (!bot) return res.json({"redirect": "/error?e=notFound"});
    if (bot.botid !== data.id) return res.json({"redirect": "/error?e=id"});

    await unirest
        .get(`https://discord.com/api/users/${data.id}`)
        .headers({
            Authorization: `Bot ${config.Token}`,
        })
        .end(async function (user) {
            if (user["raw_body"].error) return res.json({"redirect": "/error?e=userIsNotBot"});
            botData.push(JSON.parse(user["raw_body"]));
            if(!botData[0].bot) return res.json({"redirect": "/error?e=userIsNotBot"});
            if(!botData[0]) return res.json({"redirect": "/error?e=userIsNotBot"});

            await bots.updateOne( {botid: data.id}, {$set: {
                prefix: data.prefix,
                description: data.short,
                logo: `https://cdn.discordapp.com/avatars/${botData[0].id}/${botData[0].avatar}.png`,
                username: botData[0].username,
                botLibrary: data.library,
                invite: data.invite,
                long: data.long,
                website: data.web,
                support: data.support,
                botTags: data.tags,
                bannerURL: data.bannerUrl ? data.bannerUrl : bot.bannerUrl,
                webhook: data.webhook
            }});

            let bot = await bots.findOne({botid: data.id});
                var e = new discord.MessageEmbed()
                    .setTitle(`${req.user.username} Updated ${botData[0].username}`)
                    .setColor('#00ff00')
                    .setThumbnail(bot.logo)
                    .setImage(bot.bannerURL)
                    .setDescription(`[View bot page](https://botrix.cc/bots/${data.id})`)
                    .setFooter("Botrix");

                let member = req.app.get('client').guilds.cache.get(config.GUILD_ID).member(req.user.id).send(e);
                req.app.get('client').channels.cache.find(c => c.id === config.MOD_LOG).send(e)

                return res.json({"redirect": `/bots/${data.id}`});
        });
})
function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}



module.exports = route;
