const {Router} = require('express');
const users = require('../models/user');
const bots = require('../models/bots');
const config = require('../config.json');
const route = Router();

route.get("/", async (req, res, next) =>  {

    let music = await bots.find({ botTags: "music", botTags: "Music", state: "verified"}).sort({ votes: "descending" }).limit(8);
    let moderation = await bots.find({ botTags: "Moderation", state: "verified"}).sort({ votes: "descending" }).limit(8);
    const trending = await bots.find({state: "verified"}, { _id: false, auth: false }).sort({ views: "descending" }).limit(8);
    const new_ = await bots.find({state: "verified"}, { _id: false, auth: false }).sort({ date: "ascending" }).limit(8);

    let admin = false;
    if(req.user){
        if(config.ADMIN_USERS.includes(req.user.id)) admin = true;
    }
 
    let data = {
        user: req.user,
        isAdmin: admin,
        music: music,
        moderation: moderation,
        trending:trending,
        new_: new_,
        wallet: req.session
    }

    res.render("discover", data);

})

module.exports = route;