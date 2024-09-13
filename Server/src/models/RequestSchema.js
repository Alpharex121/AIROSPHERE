require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const requesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  id_card: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  enrollmentno: {
    type: String,
    required: true,
  },
  requeston: {
    type: String,
    required: true,
  },
});

const addRequest = new mongoose.model("request", requesSchema);
module.exports = addRequest;
