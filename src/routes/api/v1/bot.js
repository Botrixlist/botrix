const { Router } = require("express");
const Bots = require("../../../models/bots");

const route = Router();

route.get("/:id", async (req, res, next) => {
    
    res.setHeader('Content-Type', 'application/json');


    let bot = await Bots.findOne({ botid: req.params.id })
    
    if (!bot) return res.end(JSON.stringify({bot: "bot id not found"}));
  
    await delete bot["webhook"];
    
    console.log("[/api/v1]"+bot.webhook);
    
    let data = {
        bot: bot
    }
  
    
    res.end(JSON.stringify(data));

});

module.exports = route;
