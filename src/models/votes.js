const mongoose = require("mongoose");

const votingSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    votedFor: {
        type: String,
        required: true
    },
    dateVoted: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("votes", votingSchema);