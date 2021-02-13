const {Router} = require('express');
const bots = require('../models/bots');
const user = require('../models/user');
const config = require('../config.json');

var route = new Router();

route.use('/', async (req, res, next) => {


    let data = {
        user: req.user
    }

    res.render("join", data);
})

module.exports = route;