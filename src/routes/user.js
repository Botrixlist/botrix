const {Router} = require('express');
const users = require('../models/user');
const bots = require('../models/bots');
const server = require('../models/servers');
const config = require('../config.json');
const route = Router();

route.get("/:id", async (req, res, next) =>  {
    let user = await users.findOne({ userid: req.params.id });
    let bot = await bots.find({ owners: req.params.id })
    let servers = await server.find({ owners: req.params.id });
    console.log(servers);
    let person;
    try {
        person = await req.app.get('client').guilds.cache.get(config.GUILD_ID).members.fetch(req.params.id);
    } catch(e) {
        console.log(e);
    }
    if(user.length == 0){
        new users({
            userid: req.params.id,
            bio: "this user does not have a bio"
        }).save()

        user = await users.findOne({ userid: req.params.id });
    }
    let admin = false;
    if(req.user){
        if(config.ADMIN_USERS.includes(req.user.id)) admin = true;
    }

    let verified = false;
    for(i of bot){
        if(i.certified == "approved"){
            verified = true;
            break;
        }
    }

    for(i of servers){
        if(i.certified == "approved"){
            verified = true;
            break;
        }
    }
    let data = {
        user: req.user,
        schema: person,
        reqUser: user,
        isAdmin: admin,
        cards: bot,
        verified: verified,
        wallet: req.session
    }

    res.render("user", data);

})

module.exports = route;