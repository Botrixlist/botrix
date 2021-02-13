const {Router} = require('express');
const users = require('../models/user');
const bots = require('../models/bots');
const config = require('../config.json');
const route = Router();

route.get("/", async (req, res, next) =>  {

    res.sendFile(__dirname + "/sitemap.xml");

})

module.exports = route; 