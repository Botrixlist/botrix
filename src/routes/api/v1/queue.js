const {Router} = require('express')
const bots_ = require('../../../models/bots');

var route = Router();

route.get('/', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');


    let bots = await bots_.find({state: "unverified"});

    if(bots.length == 0) return res.end(JSON.stringify({"Error":"There is no bots in queue"}));

    let data = {
        queue: bots
    }

    res.end(JSON.stringify(data));

})

module.exports = route;