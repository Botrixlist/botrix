const {Router} = require('express');
const bots = require('../models/bots');
const user = require('../models/user');
const config = require('../config.json');

var route = new Router();

route.use('/', async (req, res, next) => {
    if(!req.user) return res.redirect('/login');
    let member = req.app.get('client').guilds.cache.get(config.GUILD_ID).member(req.user.id);

    if(!member) return res.redirect('/err?err=usernotinguild');
    let data = {
        user: req.user,
        wallet: req.session
    }

    res.render("add", data);
})

module.exports = route;