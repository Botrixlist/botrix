const { Router } = require("express");
const recomendations = require('./recomendations/botsBasedOnUser');
const api = require('../routes/api/routes');
const me = require('./me')
const add = require('./add');
const botRoute = require('./bots');
const err = require('./err');
const search = require('./search');
const bots = require('../models/bots');
const wallet = require('../models/wallet');
const serversModel = require('../models/servers');
const mod = require('./Admin/modDash');
const admin = require('./Admin/owner');
const discover = require('./discover');
const vote = require('./vote');
const confirm = require('./Admin/confirm');
const about = require('./about');
const user = require('./user');
const edit = require('./edit');
const theme = require('./settings/theme')
const tos = require('./tos');
const privacy = require('./privacy');
const partnerProgram = require('./partner');
const developers = require('./developers');
const queue = require('./queue');
const join = require('./join');
const sitemap = require('./sitemap');
const servers = require('./servers/index');
const resubmit = require('./resubmit');
const allroute = require('./allroute');
const walletDash = require('./walletdash');
const walletRoute = require('./wallet');
const storeRoute = require('./checkout/store');
const config = require('../config.json');
const checkoutPage = require('./checkout/checkoutpage');
const route = Router();
const sitemap_ = require('express-sitemap')();

route.use("*", allroute);

route.use('/queue', queue);
route.use('/btx/checkout', checkoutPage);
route.use('/btx/buy', storeRoute);
route.use('/wallet/dash', walletDash);
route.use('/wallet', walletRoute);
route.use('/resubmit', resubmit);
route.use('/about', about);
route.use('/edit', edit);
route.use('/certified', partnerProgram)
route.use('/servers', servers);
route.use('/privacy', privacy);
route.use('/tos', tos)
route.use('/me', me);
route.use('/developers', developers);
route.use('/add', add);
route.use('/join', join);
route.use('/theme', theme)
route.use('/api', api);
route.use('/err', err);
route.use('/user', user);
route.use('/sitemap', sitemap);
route.use('/discover', discover);
route.use('/bots', botRoute);
route.use('/confirm', confirm);
route.use('/search', search);
route.use('/restricted/mod', mod);
route.use('/admin', admin);
route.use('/vote', vote);


route.get('/', async (req, res) => {
    let wallet__;
    if(req.user) wallet__ = await wallet.findOne({ userid: req.user.id });
    const bot = await bots.find({state: "verified"}, { _id: false, auth: false }).sort({ votes: "descending" }).limit(8);
    const trending = await bots.find({state: "verified"}, { _id: false, auth: false }).sort({ views: "descending" }).limit(8);
    const new_ = await bots.find({state: "verified"}, { _id: false, auth: false }).sort({ date: "ascending" }).limit(8);
    const bots__ = await bots.find({state: "verified"});
    const botsize = req.app.get("client").guilds.cache.get("721282458708082713").members.cache.filter((m) => m.user.bot).size
    bot.filter(bot => bot.state != "deleted")
    let admin = false;
    if(req.user){
        if(config.ADMIN_USERS.includes(req.user.id)) admin = true;
    }

    let tagDict = new Object();
    tagDict.data = {}

    bots__.forEach(bot => {
        bot.botTags.forEach(tag => {
          
            if(!tagDict.data[tag.toLowerCase()]){
                tagDict.data[tag.toLowerCase()] = {
                    key: 0,
                    name: tag
                }
            
            } else {
               let key = tagDict.data[tag.toLowerCase()].key += 1;

                tagDict.data[tag.toLowerCase()] = {
                    key: key,
                    name: tag
                }
               
            } 
        });
    });

    const ordered = {};
    Object.keys(tagDict).sort().forEach(function(key) {
        ordered[key] = tagDict[key];
    });

    const orderedArr = [];

    for (const tag in ordered.data) {
        if (ordered.data[tag]) {
            orderedArr.push({ tag: tag, key: ordered.data[tag].key })
        }
    }
    
    let displayArr = [];


    if(orderedArr.length > 4){
        for(let i = 0; i <= 4;i++){
            if(orderedArr[i].tag !== ""){
                displayArr.push(orderedArr[i]);
            }
        }
    } else {
        displayArr = orderedArr;
    }
    if(req.user){
        //console.log(await recomendations(req.user));
    }

    var data = {
        user: req.user,
        cards: bot,
        isAdmin: admin,
        trending: trending,
        new_: new_,
        tags: displayArr,
        wallet: req.session,
       	botsize: botsize,
    }
    res.render('index', data)
})

sitemap_.generate4(route);
sitemap_.XMLtoFile('./sitemap.xml');


module.exports = route
