const { Router } = require("express");
const Bots = require("../../../models/bots");
const { json } = require("body-parser");
const route = Router();

route.get("/:id/:userID", async (req, res, next) => {

    res.setHeader('Content-Type', 'application/json');

    let bots = await Bots.findOne({ botid: req.params.id });
    console.log(bots);
    if(!bots) return res.end(JSON.stringify({ERROR: "you have provided an invalid bot id"}))

    var voted = false;
    console.log(bots);

    var date = new Date();
    var day = date.getDay();
    if(bots.usersVoted.id == req.params.userID && bots.usersVoted.date == day) voted = true;

    let data = {
        voted: voted
    }

    res.end(JSON.stringify(data));

});

module.exports = route;
