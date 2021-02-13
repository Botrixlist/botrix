const {Router} = require('express');
const bots = require('../models/bots');
const user = require('../models/user');

var route = new Router();

route.use('/', async (req, res, next) => {
    let data = {
        user: req.user,
        wallet: req.session
    }

    res.render("error/error", data);
})

module.exports = route;