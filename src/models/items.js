const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    sku:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
        default: "This product does not have a description"
    },
    realPrice :{
        type: Number
    }
});

module.exports = mongoose.model("skuDB", walletSchema);