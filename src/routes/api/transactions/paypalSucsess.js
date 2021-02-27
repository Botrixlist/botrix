const {Router} = require('express'),
paypal = require('paypal-rest-sdk'),
transactions = require('../../../models/paypalTransactions'),
gobalTransactionIndex = require('../../../models/globalTransactionIndex'),
wallet = require('../../../models/wallet'),
items = require('../../../models/items');


const route = Router();

paypal.configure({
  'mode': 'live',
  'client_id': 'AZ0gR9EN8H-QZezVs06TMzbBuetvNfbLVNxsEvY9SueRR0w_TW8Sox_tc8BImsWCSOAjQNmFe7LwzIH3',
  'client_secret': 'EAGQDcth6q2j_jyLq64G4sUqFc0k4KvS8qkVoZR8AgNJ9-q-jlJoGPU4mfeDyYk7MQxDmP_zQxICmd2p'
})

route.get('/', (req, res) => {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId
    };
    console.log(req.query);
    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
      
      if (error) {
          console.log(error.response);
          throw error;
      } else {

          console.log(payment.transactions[0].item_list.items[0].sku);

          try{

            const userWallet = await wallet.findOne({ userid: req.user.id });
            const sku = await items.findOne({ sku: payment.transactions[0].item_list.items[0].sku });
            const prevTransaction = await transactions.findOne({ transactionId: paymentId });

            if(prevTransaction){
                let data = {
                    payment: payment,
                    wallet: req.session,
                    user: req.user
                }
                return res.render('checkout/paymentSucsess', data);
            }

            await new gobalTransactionIndex({
              userid: req.user.id,
              walletId: userWallet.walletId,
              transactionName: `${sku.price} From Paypal To ${sku.name}`,
              transactionId: Math.random().toString(36).substring(7),
              transactionAmount: sku.name
            }).save();
            
            console.log(sku.realPrice);
            let newWalletAmount = userWallet.walletAmount += Number(sku.realPrice);
            console.log(newWalletAmount + " " + sku.realPrice);
            await wallet.updateOne({ userid: req.user.id }, {$set: { walletAmount: newWalletAmount }});
            
            await new transactions({
                transactionId: paymentId
            }).save();

      
          }catch(err){
            console.log(err);
          }

          let data = {
              payment: payment,
              wallet: req.session,
              user: req.user
          }

          res.render('checkout/paymentSucsess', data);
      }
  });
  });

module.exports = route;