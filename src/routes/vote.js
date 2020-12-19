const {Router} = require('express');
const bots = require('../models/bots');
const wallet = require('../models/wallet');
const config = require('../config.json');
const route = Router();

route.get("/:id", async (req, res, next) =>  {

    if(!req.user) return res.redirect('/login');
    let walletUser;
    if(req.user)  walletUser = await wallet.findOne({ userid: req.user.id });
    let bot = await bots.findOne({ botid: req.params.id });

    if(!bot) return res.statusCode(404);

    let admin = false;
    if(req.user){
        if(config.ADMIN_USERS.includes(req.user.id)) admin = true;
    }
    let data = {
        user: req.user,
        bot: bot,
        isAdmin: admin,
        wallet: walletUser,
        wallet: req.session
    }

    res.render("vote", data);

})

module.exports = route;