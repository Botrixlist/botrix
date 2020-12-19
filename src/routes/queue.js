const {Router} = require('express');
const bots = require('../models/bots');
const user = require('../models/user');
const config = require('../config.json');

var route = new Router();

route.use('/', async (req, res, next) => {

   let botsInQueue = await bots.find({ state: "unverified"});

    let data = {
        user: req.user,
        wallet: req.session,
        bots: botsInQueue
    }

    res.render("queue", data);
})

module.exports = route;