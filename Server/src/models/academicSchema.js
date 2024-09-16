require("dotenv").config();
const mongoose = require("mongoose");

const academicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  subject: {
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
  subcode: {
    type: String,
    required: true,
  },
  postername: {
    type: String,
    required: true,
  },
});

const addAcademic = new mongoose.model("academic", academicSchema);
module.exports = addAcademic;
