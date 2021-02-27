const mongoose = require("mongoose");

const changeSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    title: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("chagne", changeSchema);