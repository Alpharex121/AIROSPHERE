require("dotenv").config();
const mongoose = require("mongoose");

const peerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
  },
  postername: {
    type: String,
    required: true,
  },
});

const addPeer = new mongoose.model("findpeer", peerSchema);
module.exports = addPeer;
