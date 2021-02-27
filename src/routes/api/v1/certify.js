const { Router } = require("express");
const config = require('../../../config.json');
const Bots = require("../../../models/bots");

const route = Router();

route.get("/deny/:id", async (req, res, next) => {


    let bot = await Bots.findOne({ botid: req.params.id })
    
    if(!req.user) res.redirect("/restricted/mod");

    if(!config.ADMIN_USERS.includes(req.user.id)) return res.redirect("/restricted/mod?page=certifacation&error=Not Authorized");

    if (!bot) return res.redirect("/restricted/mod?page=certifacation&error=Bot not found");

    if (bot.certified != "pending") return res.redirect("/restricted/mod?page=certifacation&error=Bot not in a pending status");

    await Bots.updateOne({botid: req.params.id}, {$set: { certified: "unverified" }});

   
    return res.redirect("/restricted/mod?page=certifacation&done=Denied "+bot.username);

});

route.get("/:id", async (req, res, next) => {


    let bot = await Bots.findOne({ botid: req.params.id });

    if(!req.user) res.redirect("/restricted/mod");
    
    if(!config.ADMIN_USERS.includes(req.user.id)) return res.redirect("/restricted/mod?page=certifacation&error=Not Authorized");

    if (!bot) return res.redirect("/restricted/mod?page=certifacation&error=Bot not found");

    if (bot.certified != "pending") return res.redirect("/restricted/mod?page=certifacation&error=Bot not in a pending status");

    await Bots.updateOne({botid: req.params.id}, {$set: { certified: "approved" }});

   
    return res.redirect("/restricted/mod?page=certifacation&done=Certified "+bot.username);

});

module.exports = route;
