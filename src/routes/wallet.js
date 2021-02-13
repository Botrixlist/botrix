const {Router} = require('express');
const bots = require('../models/bots');
const user = require('../models/user');
const wallet = require('../models/wallet');

var route = new Router();

route.use('/', async (req, res, next) => {
    let walletUser;
    if(req.user)   walletUser = await wallet.findOne({ userid: req.user.id });
    var data = {
        user: req.user,
        wallet: walletUser
    }

    res.render("wallet", data);
})

module.exports = route;