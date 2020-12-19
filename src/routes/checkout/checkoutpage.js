const {Router} = require('express');
const wallet = require('../../models/wallet');
const items = require('../../models/items');

var route = new Router();

route.use('/', async (req, res, next) => {
    if(!req.user) res.redirect('/login');
    let walletUser;
    if(req.user)   walletUser = await wallet.findOne({ userid: req.user.id });

    var finalCookie;
    var name = "cart" + "=";
    var ca = req.headers.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        finalCookie = await c.substring(name.length, c.length);
      } 
    } 

    let item = await items.findOne({ sku: finalCookie });

    if(!item){
        finalCookie = null;
    }

    var data = {
        user: req.user,
        wallet: req.session,
        cart: item
    }

    res.render("checkout/checkout", data);
})




module.exports = route;