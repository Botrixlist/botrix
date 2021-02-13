const {Router} = require('express');
const request = require('request');
const {checkUser} = require('../../../../discordWrapper/checkUser');
const unirest = require("unirest");
const bots = require('../../../models/bots');
const discord = require('discord.js');

const isHtml = require('is-html');
const config = require('../../../config.json')


var route = new Router();

route.post('/', async (req, res, next) => {
    let data = req.body;
    if(!req.user) return res.json({"redirect": "/login"});
    if(data.short.length > 120) return res.json({"redirect": "/err?err=charLength"});
    if(isHtml(data.long) || isHtml(data.short)) return res.json({"redirect": "/err?err=htmlNotSupported"});
    let botCheck = await bots.find({ botid: data.id });

    if(botCheck.length !== 0) return res.json({"redirect": "/err?e=alreadyOnList"});
    


    let botData = [];
    await checkUser(config.Token, data.id).then((user) => {
      
        if (user["raw_body"].error) return res.json({"redirect": "/err?err=userIsNotBot"});
        botData.push(JSON.parse(user["raw_body"]));
        if(!botData[0].bot) return res.json({"redirect": "/err?err=userIsNotBot"});
        new bots({
            botid: data.id,
            prefix: data.prefix,
            description: data.short,
            logo: `https://cdn.discordapp.com/avatars/${botData[0].id}/${botData[0].avatar}.png`,
            username: botData[0].username,
            botLibrary: data.library,
            invite: data.invite,
            long: data.long,
            website: data.web,
            support: data.support,
            owners: req.user.id,
            botTags: data.tags,
            bannerURL: data.bannerUrl,
            webhook: data.webhook
        }).save();
    
        try{
            let r = req.app.get('client').guilds.cache.get(config.GUILD_ID).roles.cache.find(r => r.id === '747393632947929139');
            r.setMentionable(true)
            var e = new discord.MessageEmbed()
            .setTitle('Bot Added!')
            .setColor('#00ff00')
            .setDescription(` [Invite bot](https://discord.com/oauth2/authorize?client_id=${data.id}&scope=bot&guild_id=${config.GUILD_ID}&permissions=0)`)
            .addField(`Prefix`, `**\`${data.prefix}\`**`, true)
            .addField(`Made By`, `<@${req.user.id}>`, true)
            .addField(`Link`, `https://botrix.cc/bots/${data.id}`);
            let member = req.app.get('client').guilds.cache.get(config.GUILD_ID).member(req.user.id).send(e);
            req.app.get('client').channels.cache.find(c => c.id === config.MOD_LOG).send(`${r}`)
            req.app.get('client').channels.cache.find(c => c.id === config.MOD_LOG).send(e)
            r.setMentionable(false);
            return res.json({"redirect": "/bots/"+botData[0].id});
        } catch (e) {
            console.log(e);
        }
    });

    /*
    await unirest
        .get(`https://discord.com/api/users/${data.id}`)
        .headers({
            Authorization: `Bot ${config.Token}`,
        })
        .end(function (user) {
            if (user["raw_body"].error) return res.json({"redirect": "/err?err=userIsNotBot"});
            botData.push(JSON.parse(user["raw_body"]));
            if(!botData[0].bot) return res.json({"redirect": "/err?err=userIsNotBot"});
            new bots({
                botid: data.id,
                prefix: data.prefix,
                description: data.short,
                logo: `https://cdn.discordapp.com/avatars/${botData[0].id}/${botData[0].avatar}.png`,
                username: botData[0].username,
                botLibrary: data.library,
                invite: data.invite,
                long: data.long,
                website: data.web,
                support: data.support,
                owners: req.user.id,
                botTags: data.tags,
                bannerURL: data.bannerUrl,
                webhook: data.webhook
            }).save();
        
            try{
                let r = req.app.get('client').guilds.cache.get(config.GUILD_ID).roles.cache.find(r => r.id === '747393632947929139');
                r.setMentionable(true)
                var e = new discord.MessageEmbed()
                .setTitle('Bot Added!')
                .setColor('#00ff00')
                .setDescription(` [Invite bot](https://discord.com/oauth2/authorize?client_id=${data.id}&scope=bot&guild_id=${config.GUILD_ID}&permissions=0)`)
                .addField(`Prefix`, `**\`${data.prefix}\`**`, true)
                .addField(`Made By`, `<@${req.user.id}>`, true)
                .addField(`Link`, `https://botrix.cc/bots/${data.id}`);
                let member = req.app.get('client').guilds.cache.get(config.GUILD_ID).member(req.user.id).send(e);
                req.app.get('client').channels.cache.find(c => c.id === config.MOD_LOG).send(`${r}`)
                req.app.get('client').channels.cache.find(c => c.id === config.MOD_LOG).send(e)
                r.setMentionable(false);
                return res.json({"redirect": "/bots/"+botData[0].id});
            } catch (e) {
                console.log(e);
            }
        });
    */
})

function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}




module.exports = route;
