const {Router} = require('express');
const bots = require('../models/bots');
const user = require('../models/user');

var route = new Router();

route.use('/', async (req, res, next) => {

    var data = {
        user: req.user,
        wallet: req.session
    }

    res.render("about", data);
})

module.exports = route;