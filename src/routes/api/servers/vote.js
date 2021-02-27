const {Router} = require('express');
const discord = require('discord.js');
const servers = require('../../../models/servers');
const config = require('../../../config.json')
const { MessageEmbed, WebhookClient } = require('discord.js');

var route = new Router();

route.get('/:id', async (req, res, next) => {

    if(!req.user) return res.redirect("/login");

    const currentServer = await servers.findOne({ guildID: req.params.id });

    let server = await servers.find({});
    if(!currentServer) return res.send(404);
    var currentVotes = currentServer.votes += 1;

    var date = new Date();
    //this shit is retarded there should be a better way do this
    let userVoted = false;
    server.forEach(serverElement => {
        serverElement.usersVoted.forEach(id =>{
            if(id.id == req.user.id){
              
                var currentDay = date.getDay();
                let timeout = 8.64e+7;
                if(timeout - (Date.now() - id.date) > 0 && req.user.id !== "222042705285480448" && req.user.id !== "216852520088109056"){
                    userVoted = true
                    return res.redirect(`/err?e=voteFailed`);
                }
            }
        });
        
    });
    
    let _server = await servers.findOne({ guildID: req.params.id });
    
    var e3 = new MessageEmbed()
           .setTitle('Voted for server!')
           .setColor('#ffffff')
           .setThumbnail(_server.serverIco)
           .setDescription(`<@!${req.user.id}> (${req.user.username}) has voted for ${_server.name}`)
           .addField("Server Page", `[View Server page](https://botrix.cc/servers/server/${req.params.id})`)
           .addField("Server Votes", `${currentVotes}`)
           .setTimestamp()
    
    if(userVoted == false){

        await servers.updateOne({ guildID: req.params.id }, {$set: { usersVoted: { "id": req.user.id, "voteExpire": (date.getDay() + 7)}, votes: currentVotes} });
        req.app.get('client').channels.cache.find(c => c.id === config.VOTE_LOG).send(e3)

        if(_server.webhook !== "none") { 
            let webhook = new URL(_server.webhook).pathname.toString().split("/")
            const webhookClient = new WebhookClient(webhook[3].toString(), webhook[4].toString());
            if(webhookClient){
              webhookClient.send(`${req.user.username} just vote for ${_server.name} on https://botrix.cc/servers/server/${req.params.id}`, {
                    username: 'Botrix',
                    avatarURL: 'https://cdn.discordapp.com/attachments/747602999035166810/757838697080160356/logo_wo_background.png',
                }).catch(() => {});
            }
        }

        return res.redirect(`/servers/server/${req.params.id}`);
    }
})

module.exports = route;
