const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  walletId:{
    type: String
  },
  walletInfo:{
    type: Object
  },
  transactions: {
    type: Array
  },
  walletAmount: { 
    type: Number
  }
});

module.exports = mongoose.model("Wallet", walletSchema);