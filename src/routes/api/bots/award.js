const {Router} = require('express');
const bots = require('../../../models/bots');
const wallet = require('../../../models/wallet');
const gti = require('../../../models/globalTransactionIndex');
const rewards = require('../../../models/rewards');
const user = require('../../../models/user');

var route = new Router();

route.post('/:id/gift/:sku', async (req, res, next) => {

    if(!req.user) return res.send(JSON.stringify({error: "You must login to gift an award"}))
    if(!req.params.id) return res.send(JSON.stringify({ error: "Fatal error: No bot id provided, please refresh" }));
    if(!req.params.sku) return res.send(JSON.stringify({ error: "Fatal error: No SKU number provided, please refresh" }));
    
    let thisAward = await rewards.findOne({ sku: req.params.sku });
    if(!thisAward) return res.send(JSON.stringify({ error: "Fatal error: Award not found, please refresh." }));

    let thisBot = await bots.findOne({ botid: req.params.id });
    if(!thisBot) return res.send(JSON.stringify({ error: "Fatal error: Bot not found, please refresh." }));
    
    let thisWallet = await wallet.findOne({ userid: req.user.id });

    if(Number(thisWallet.walletAmount) < Number(thisAward.price)) return res.send(JSON.stringify({ error: "not enough funds" }));

    let thisNewAmount = (Number(thisWallet.walletAmount) - Number(thisAward.price));
    
    await wallet.updateOne( { userid: req.user.id },{$set: {walletAmount: thisNewAmount}});

    await new gti({
        userid: req.user.id,
        walletId: thisWallet.walletId,
        transactionName: `${thisAward.name} Award given to ${thisBot.username}`,
        transactionAmount: `-${thisAward.price}`,
        transactionId: Math.random().toString(36).substring(7)
    }).save();

    await bots.updateOne({ botid: req.params.id }, {$push: { badges: { name: thisAward.name, sku: thisAward.sku, userid: req.params.id } }});

    res.send(JSON.stringify({done: "award has been recieved"}))

})

module.exports = route;