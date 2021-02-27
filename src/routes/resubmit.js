const {Router} = require('express');
const bots = require('../models/bots');
const user = require('../models/user');

var route = new Router();

route.use('/:id', async (req, res, next) => {

    if(!req.user) return res.redirect('/login');
    let bot = await bots.findOne({ botid: req.params.id });
    if(!bot.owners.includes(req.user.id)) return res.status(404).end();
    if(!bot) return res.status(404).end();
    console.log(bot);
    let data = {
        user: req.user,
        bot: bot,
        wallet: req.session
    }

    res.render("edit", data);
})

module.exports = route;