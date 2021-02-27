const config = require('../../../config.json');
const {Router} = require('express');
const servers = require('../../../models/servers');
let route = Router();

route.get('/:id', async (req, res, next) => {
    if(!req.user) return res.redirect('/login');
    let server = await servers.findOne({ guildID: req.params.id});

    if(!server) return res.redirect('/servers');
    if(!config.ADMIN_USERS.includes(req.user.id)) return res.redirect('/servers');
    if(!server.owners.includes(req.user.id)) return res.redirect('/servers');

    await servers.deleteOne({ guildID: req.params.id});

    return res.redirect('/servers');
});

module.exports = route;
