require("dotenv").config();
const mongoose = require("mongoose");

const findteamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  opening: {
    type: number,
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

const addAcademic = new mongoose.model("academic", findteamSchema);
module.exports = addAcademic;
