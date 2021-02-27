const {Router} = require('express');
const bots = require('../models/bots');
const wallet = require('../models/wallet');
const user = require('../models/user');
const config = require('../config.json');

var route = new Router();

route.get("*", async (req, res, next) => {



    if(req.user){
        let userWallet  = await wallet.findOne({ userid: req.user.id });
        if(!userWallet){

            let walletID = Math.random().toString(36).substring(64);

            await new wallet({
                userid: req.user.id,
                walletId: walletID,
                walletAmount: 50
            }).save();
    
            userWallet = await wallet.find({ userid: req.user.id });
        }
        req.session.wallet = userWallet;
    }

    if(!config.maintenince) return next();
    if(req.user && config.ADMIN_USERS.includes(req.user.id)) return next();
    let data = {
        user: req.user,
        wallet: req.session.wallet
    }

    res.render("maintenince", data)
});

module.exports = route;
