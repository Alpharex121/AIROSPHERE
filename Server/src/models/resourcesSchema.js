require("dotenv").config();
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
});

const   addResource = new mongoose.model("resource", resourceSchema);
module.exports = addResource;
