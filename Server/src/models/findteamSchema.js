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

const addTeam = new mongoose.model("findteam", findteamSchema);
module.exports = addTeam;
