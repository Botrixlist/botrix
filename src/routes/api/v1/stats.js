const { Router } = require("express");
const Bots = require("../../../models/bots");
const Users = require("../../../models/user");
const { json } = require("body-parser");
const route = Router();

route.post("/:id", async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    let body = req.body;

    if(!authBot) return res.end(JSON.stringify({error: "That is an invalid bot id"}));
    if(!body.guils) return res.end(JSON.stringify({error: "That is an invalid useage, please refer to our docs docs.botrix.tk"}));

    //set servers
    Bots.updateOne({ auth: req.headers.authorization.replace("Bearer ", "") }, { servers: body.guilds});
    

    res.end(JSON.stringify(data));

});

module.exports = route;
