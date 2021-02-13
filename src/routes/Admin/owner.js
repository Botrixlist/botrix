const { Router } = require('express');
const bots = require('../../models/bots');
const user = require('../../models/user');
const config = require('../../config.json');

var route = new Router();

route.use('/', async (req, res, next) => {
    if (!req.user) return res.redirect('/login');


    if (!config.OWNER_USERS.includes(req.user.id)) return res.json({ "redirect": "/" });

    let bot = await bots.find({ state: "unverified" });
    let data = {
        user: req.user,
        bot: bot,
        queue: (await bot).length,
        siteStats: false,
    }

    res.render("./mod/owner", data);
})

module.exports = route;     