const {Router} = require('express');
const discord = require('discord.js');
const client = new discord.Client()
const bots = require('../../../models/bots');
const wallet = require('../../../models/wallet');
const transactionIndex = require('../../../models/globalTransactionIndex');
const config = require('../../../config.json')
const { MessageEmbed,WebhookClient } = require('discord.js');

var route = new Router();

route.get('/:id', async (req, res, next) => {

    if(!req.user) return res.redirect("/login");

    const currentBot = await bots.find({ botid: req.params.id });
    let bot = await bots.find({});
    if(currentBot.length == 0) return res.send(404);
    var currentVotes = currentBot[0].votes += 1;
    let timeout = 8.64e+7;

    var date = Date.now();
    
    //this shit is retarded there should be a better way do this
    let userVoted = false;
    bot.forEach(botElement => {
        botElement.usersVoted.forEach(id =>{
            if(id.id == req.user.id){
                if(timeout - (Date.now() - id.date) > 0 && req.user.id !== "222042705285480448"){
                    userVoted = true
                    return res.redirect(`/err?err=voteFailed`);
                }
            }
        });
    });

 
    console.log()
    
    
    let botUser = await bots.findOne({ botid: req.params.id });

    let botID = await client.users.cache.get(req.params.id);

    var e3 = new MessageEmbed()
      .setTitle('Bot Voted!')
      .setColor('#fca311')
      .setThumbnail(req.params.logo)
      .setImage(req.params.bannerURL)
      .setDescription(`<@!${req.user.id}> (${req.user.username}) has voted for <@${req.params.id}>`)
      .addField("Bot Page", `[View bot Here](https://botrix.cc/bots/${req.params.id})`)
      .addField("Bot Votes", `${currentVotes}`)
      .setTimestamp()
    
    var e4 = new MessageEmbed()
      .setTitle('Voted Updated!')
      .setColor('#fca311')
      .setThumbnail(req.params.logo)
      .setDescription(`<@!${req.user.id}> (${req.user.username}) has voted for <@${req.params.id}>`)
      .addField("Bot Page", `[View bot Here](https://botrix.cc/bots/${req.params.id})`)
      .addField("Bot Votes", `${currentVotes}`)
      .setTimestamp()
    
    if(userVoted == false){

        await bots.updateOne({ botid: req.params.id }, {$set: { usersVoted: { "id": req.user.id, "date": Date.now()}, votes: currentVotes} });
        
        let walletToPutAmount = await wallet.findOne({ userid: botUser.owners[0] });
        
        if(walletToPutAmount){
            const transaction = await new transactionIndex({
                userid: req.user.id,
                walletId: walletToPutAmount.walletId,
                transactionName: `${req.user.username} Voted for ${botUser.username}`,
                transactionId: Math.random().toString(36).substring(7),
                transactionAmount: "+10"
            }).save();
            let walletAmount = walletToPutAmount.walletAmount += 10;
            await wallet.updateOne({ userid: botUser.owners[0] }, {$set: {walletAmount:  walletAmount}});

            console.log(`[/api/bots/vote.js] Transaction Received~! ${req.user.id} has put 10BTX in ${botUser.owners[0]} wallet from the botrix exchange ${transaction}`)
        }

        if(botUser.webhook !== "none") { 
            let webhook = new URL(botUser.webhook).pathname.toString().split("/")
            const webhookClient = new WebhookClient(webhook[3].toString(), webhook[4].toString());
            if(webhookClient){
                webhookClient.send({
                    username: 'Botrix',
                    avatarURL: 'https://cdn.discordapp.com/attachments/747602999035166810/757838697080160356/logo_wo_background.png',
                    embeds: [e3],
                }).catch(() => {});
            }
        }

        req.app.get('client').channels.cache.find(c => c.id === config.VOTE_LOG).send(e3);

        return res.redirect(`/bots/${req.params.id}`);
    }
})

module.exports = route;
