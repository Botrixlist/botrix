const {Router} = require('express');
const users = require('../models/user');
const bots = require('../models/bots');
const servers_ = require('../models/servers');
const wallets_ = require('../models/wallet');
const config = require('../config.json');
const route = Router();

route.get("/", async (req, res, next) =>  {

    if(!req.user) return res.redirect('/login');

    let user = await users.findOne({ userid: req.user.id });
    let bot = await bots.find({ owners: req.user.id })
    let servers = await servers_.find({ owners: req.user.id })
    let wallet = await wallets_.findOne({ userid: req.user.id });

    if(!user){
        await new users({
            userid: req.user.id,
            bio: "this user does not have a bio"
        }).save();


        user = await users.findOne({ userid: req.user.id });
    }

    
    if(!wallet){
        let walletID = Math.random().toString(36).substring(64);

        await new wallets_({
            userid: req.user.id,
            walletId: walletID,
            walletAmount: 1000
        }).save();

        wallet = await wallets_.find({ userid: req.user.id });

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
        schema: user,
        isAdmin: admin,
        cards: bot,
        servers: servers,
        verified: verified,
        wallet: req.session
    }

    res.render("me", data);

})

module.exports = route;