const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    transactionId:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("paypaltransactions", walletSchema);