const {Router} = require('express');
const bots = require('../../models/bots');
const user = require('../../models/user');
const config = require('../../config.json');
const { session } = require('passport');

var route = new Router();

route.use('/deny/:id', async (req, res, next) => {
    if(!req.user) return res.redirect('/login');
    
    if(!config.ADMIN_USERS.includes(req.user.id))return res.json({"redirect": "/"});

    let bot = await bots.findOne({botid: req.params.id });
    let data = {
        user: req.user,
        bot: bot,
        queue: (await bot).length,
        wallet: req.session
    }

    res.render("mod/confirmDecline", data);
})


route.use('/delete/:id', async (req, res, next) => {
    if(!req.user) return res.redirect('/login');
    
    if(!config.ADMIN_USERS.includes(req.user.id))return res.json({"redirect": "/"});

    let bot = await bots.findOne({botid: req.params.id });
    let data = {
        user: req.user,
        bot: bot,
        queue: (await bot).length,
        wallet: req.session
    }

    res.render("mod/confimDelete", data);
})

module.exports = route;