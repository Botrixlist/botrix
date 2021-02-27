const { Router } = require('express');
const config = require('../../config.json');
const servers = require('../../models/servers');
var route = Router();

route.get('/', async (req, res, next) => {

    if(!req.user) return res.redirect('/login');
    let member = req.app.get('serverClient').guilds.cache.get(config.GUILD_ID).member(req.user.id);

    let guilds = req.app.get('serverClient').guilds.cache;
    let guildArr = [];
    let guildIDs = [];
    let servers_ = await servers.find({});
    guilds.forEach(guild => {
        
        if(guild.member(req.user.id) && guild.member(req.user.id).hasPermission(['ADMINISTRATOR' || 'OWNER'])){
            servers_.forEach(server => {
               
                if(server.guildID !== guild.id && !guildIDs.includes(guild.id)){
                    var emojiArr = [];
                    const emojiList = guild.emojis.cache.map((e, x) => emojiArr.push(e));
                    
                    guildArr.push({
                        guild: guild,
                        emojis: emojiList
                    });
                    guildIDs.push(guild.id);
                }
            });

        }
    })

    if(!member) return res.redirect('/err?err=usernotinguild');
   
    let data = {
        user: req.user,
        guilds: guildArr
    }

    res.render('servers/add', data);
});


route.get('/:id', (req, res, next) => {
    if(!req.user) return res.redirect('/login');
    let member = req.app.get('serverClient').guilds.cache.get(config.GUILD_ID).member(req.user.id) || req.app.get('client').guilds.cache.get(config.GUILD_ID).member(req.user.id);

    let guild = req.app.get('serverClient').guilds.cache.get(req.params.id) || req.app.get('client').guilds.cache.get(config.GUILD_ID).member(req.user.id);
    var emojiArr = [];
    const emojiList = guild.emojis.cache.map((e, x) => emojiArr.push(`https://cdn.discordapp.com/emojis/${e.id}.png`));
  
    if(!member) return res.redirect('/err?err=usernotinguild');

    let data = {
        user: req.user,
        guild: guild,
        emoji: emojiArr
    }

    res.render('servers/addForm', data); 
});

module.exports = route;
