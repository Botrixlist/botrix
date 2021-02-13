const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  walletId:{
    type: String
  },
  transactionName:{
      type: String
  },
  transactionId:{
      type: String
  },
  transationDate: {
    default: () => new Date(),
    type: Date
  },
  transactionAmount:{
      type: String
  }
});

module.exports = mongoose.model("transactionIndex", walletSchema);