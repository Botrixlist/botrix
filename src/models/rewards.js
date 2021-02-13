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
    img:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("rewards", walletSchema);