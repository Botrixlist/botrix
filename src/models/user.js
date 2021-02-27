const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  bio: {
    type: String,
    default: "This user has no bio"
  },
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
  recentViews: {
    type: Array
  },
  authentication: {
    type: String
  }
});

module.exports = mongoose.model("Users", usersSchema);