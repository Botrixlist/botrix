const {Router} = require('express');
var route = Router();

const bot = require('./bot');
const queue = require('./queue');
const voted = require('./voted');
const cert = require('./certify');

route.use('/bot', bot);
route.use('/queue', queue);
route.use('/certify', cert);
route.use('/voted', voted);

module.exports = route;