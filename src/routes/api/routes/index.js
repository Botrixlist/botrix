const express = require('express');
const router = express.Router()
const submit = require('../bots/submit');
const approve = require('../bots/approve');
const edit = require('../bots/edit');
const decline = require('../bots/decline');
const delete_ = require('../bots/delete');
const vote = require('../bots/vote');
const v1 = require('../v1/index');
const submitServer = require('../servers/submit');
const editServer = require('../servers/edit');
const serverVote = require('../servers/vote');
const serverDelete = require('../servers/delete');
const cancelPaypal = require('../transactions/paypalDecline');
const paypal = require('../transactions/paypalPay');
const reward = require('../bots/award');
const paypalSucsess = require('../transactions/paypalSucsess');
const { route } = require('../../index.js');

router.use('/pay', paypal);
router.use('/award', reward);
router.use('/cancel', cancelPaypal)
router.use('/success', paypalSucsess);
router.use('/submit', submit);
router.use('/servers/vote', serverVote);
router.use('/servers/submit', submitServer);
router.use('/servers/edit', editServer);
router.use('/servers/delete', serverDelete);
router.use('/approve', approve);
router.use('/vote', vote);
router.use('/v1', v1);
router.use('/edit', edit);
router.use('/delete', delete_);
router.use('/decline', decline);
module.exports = router