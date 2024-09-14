require("dotenv").config();
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  counter: {
    type: String,
    required: true,
  },
});

const addCounter = new mongoose.model("counter", counterSchema);
module.exports = addCounter;
