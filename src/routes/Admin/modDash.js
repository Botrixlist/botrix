const { Router } = require('express');
const bots = require('../../models/bots');
const user = require('../../models/user');
const gti = require('../../models/globalTransactionIndex');
const config = require('../../config.json');

var route = new Router();

route.use('/', async (req, res, next) => {
    if (!req.user) return res.redirect('/login');

    if (!config.ADMIN_USERS.includes(req.user.id)) return res.json({ "redirect": "/" });
    let transactions = await gti.find({  });
    let bot = await bots.find({ state: "unverified" });
    let certBots = await bots.find({ certifacation: "unverified" });
    let data = {
        user: req.user,
        bot: bot,
        queue: (await bot).length,
        wallet: req.session,
        transactions: transactions,
        cert: certBots
    }

    res.render("./mod/dashboard", data);
})

module.exports = route;