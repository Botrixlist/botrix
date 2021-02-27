const express = require('express');
 const servers = require("../../models/servers");
 const config = require('../../config.json');
const route = express.Router()

route.get('/:id', async (req, res, next) => {

    let server = await servers.findOne({ guildID: req.params.id });
 
    if(!server) return res.sendStatus(404);
    
    let guild;


    if(req.app.get('client').guilds.cache.get(server.guildID)){
     
       const guild = req.app.get('client').guilds.cache.get(server.guildID) || req.app.get('serverClient').guilds.cache.get(server.guildID);
        var emojiArr = [];
        const emojiList = guild.emojis.cache.map((e, x) => emojiArr.push(`https://cdn.discordapp.com/emojis/${e.id}.png`));
    
    }

    let isAdmin = false;    
    if(req.user){
        if(config.ADMIN_USERS.includes(req.user.id)){
            isAdmin = true;
        }
    }

    var data = {
        user: req.user,
        server: server,
        guild: guild,
        emotes: emojiArr,
        isAdmin: isAdmin

    }
    res.render("servers/server", data);
});

module.exports = route
