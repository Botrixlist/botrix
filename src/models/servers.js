const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    guildID:{
        type: String,
        required: true
    },
    serverIco:{
        type: String,
    },
    owners: {
        type: Array,
        required: true
    },
    certified:{
      type: String,
      required: false,
      default: "unverified"
    },
    votes: {
        type: Number,
        required: false,
        default: 0
    },
    usersVoted: {
        type: Array,
        required: false,
        default: []
    },
    invite: {
        type: String,
        required: true
    },
    emotes:{
        type: Array,
        required: false
    },
    short: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    tags:{
        type: Array,
        required: false
    },
    bumped:{
        type: Number,
        required: false,
        default: Date.now()
    },
    webhook: {
      type: String, 
      default: "none" 
    }
});

module.exports = mongoose.model("Servers", serverSchema);
