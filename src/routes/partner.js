const {Router} = require('express');
const bots = require('../models/bots');
const servers = require('../models/servers');
const discord = require('discord.js');
const user = require('../models/user');
const config = require('../config.json');

var route = new Router();


route.use('/server/add/:id', async(req, res, next) => {
   
    if(!req.user) res.redirect('/login');

    let server_  = await servers.findOne({guildID: req.params.id});
  

    if(!server_) return res.redirect('/err?err=notFound');

    if(!server_.owners.includes(req.user.id)) return res.redirect('/');

    if(server_.certified == "pending") return res.redirect('/err?err=alreadyPending');
    if(server_.certified == "approved") return res.redirect('/err?err=alreadyPartnered');

    await servers.updateOne({ guildID: req.params.id }, {$set: { certified: "pending" }})

    var e = new discord.MessageEmbed()
    .setTitle('Server applied')
    .setColor('#00ff00')
    .addField(`Server info`, `**Server name: <@${server_.name}>** **Votes: ${server_.votes}**`)
    .setFooter('Tip: To approve a certifacation request do *cert @bot');

    req.app.get('client').channels.cache.find(c => c.id === config.CERT_LOGS).send(e)

    let data = {
        user: req.user,
        wallet: req.session
    }

    res.render("certified/sucsess", data)
})

route.use('/add/:id', async(req, res, next) => {

    if(!req.user) res.redirect('/login');

    let bot_  = await bots.findOne({botid: req.params.id});

    if(!bot_) res.redirect('/err?err=notFound');

    if(!bot_.owners.includes(req.user.id)) return res.redirect('/');

    if(bot_.certified == "pending") return res.redirect('/err?err=alreadyPending');
    if(bot_.certified == "approved")  return res.redirect('/err?err=alreadyPartnered');

    await bots.updateOne({ botid: req.params.id }, {$set: { certified: "pending" }})

    var e = new discord.MessageEmbed()
    .setTitle('Bot applied')
    .setColor('#00ff00')
    .addField(`Bot info`, `**Bot: <@${req.params.id}>** **Votes: ${bot_.votes}**`)
    .setFooter('Tip: To approve a certifacation request do *cert @bot');

    req.app.get('client').channels.cache.find(c => c.id === config.CERT_LOGS).send(e)

    let data = {
        user: req.user,
        wallet: req.session
    }

    res.render("certified/sucsess", data)
})

route.use('/add', async(req, res, next) => {

    if(!req.user) res.redirect('/login');

    let bots_  = await bots.find({owners: req.user.id});

    let servers_  = await servers.find({owners: req.user.id});
    let data = {
        user: req.user,
        bot: bots_,
        server: servers_,
        wallet: req.session
    }

    res.render("certified/certifiedProgramSelect", data)
})

route.use('/', async (req, res, next) => {


    let data = {
        user: req.user,
        wallet: req.session
    }

    res.render("certified/certifiedProgram", data);
})


module.exports = route;