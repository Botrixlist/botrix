const {Router} = require('express');
const bots = require('../models/bots');
const user = require('../models/user');
const wallet = require('../models/wallet');
const gti = require('../models/globalTransactionIndex');
var route = new Router();


route.use('/campaign/new/:type', async (req, res, next) => {

    if(!req.user) return res.redirect('/login');

    let walletUser;
    if(req.user) walletUser = await wallet.findOne({ userid: req.user.id });
    let transactions = await gti.find({ userid: req.user.id });

    var data = {
        user: req.user,
        wallet: walletUser,
        transactions: transactions,
        type: req.params.type
    }

    res.render("newCampaign", data);
})

route.use('/', async (req, res, next) => {

    if(!req.user) return res.redirect('/login');

    let walletUser;
    if(req.user) walletUser = await wallet.findOne({ userid: req.user.id });
    let transactions = await gti.find({ userid: req.user.id });

    var data = {
        user: req.user,
        wallet: walletUser,
        transactions: transactions
    }

    res.render("walletDash", data);
})

module.exports = route;