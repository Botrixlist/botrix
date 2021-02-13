const {Router} = require('express');
const wallet = require('../../models/wallet');

var route = new Router();

route.use('/', async (req, res, next) => {
    let walletUser;
    if(req.user)   walletUser = await wallet.findOne({ userid: req.user.id });
    var data = {
        user: req.user,
        wallet: req.session
    }

    res.render("checkout/storePage", data);
})

module.exports = route;