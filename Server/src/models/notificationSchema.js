require("dotenv").config();
const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  uploaddate: {
    type: String,
    required: true,
  },
});

const addNotification = new mongoose.model("notification", notificationSchema);
module.exports = addNotification;
