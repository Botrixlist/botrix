const {Router} = require('express');

var route = Router();

route.get('/', (req, res, next) => {

    let data = {
        user: req.user,
        wallet: req.session
    }
    
    res.render('checkout/paypalFail', data);
})


module.exports = route;
