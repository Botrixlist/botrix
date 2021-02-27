const {Router} = require('express');
const servers = require('../../models/servers');
const config = require('../../config.json');
const route = Router();

route.get("/:id", async (req, res, next) =>  {

    if(!req.user) return res.redirect('/login');

    let server = await servers.findOne({ guildID: req.params.id });

    if(!server) return res.statusCode(404);

    let admin = false;
    if(req.user){
        if(config.ADMIN_USERS.includes(req.user.id)) admin = true;
    }
    let data = {
        user: req.user,
        server: server,
        isAdmin: admin
    }

    res.render("servers/votes", data);

})

module.exports = route;