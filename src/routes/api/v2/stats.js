const bots = require('../../../models/bots');
const users = require('../../../models/user');
const {Router} = require('express');

let route = Router();

route.post('/:id', async (req, res, next) => {
    
    const user = await users.findOne({ authentication: req.headers.authorization.split(" ")[1] });

    if(!user){
        res.statusCode(403);
        res.send(JSON.stringify({ error: "authorization"}));
        return res.end();
    }

    const bot = await bots.findOne({ botid: req.params.id });

    if(!bot.owners.includes(user.userid)){
        res.statusCode(403);
        res.send(JSON.stringify({ error: "Not authorized to modify that bot"}));
        return res.end();
    }
    
});

module.exports = route;
