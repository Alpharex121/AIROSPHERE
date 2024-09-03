require("dotenv").config();
const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  head: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
  members: [
    {
      member: {
        type: String,
      },
    },
  ],
  notification: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
});

clubSchema.methods.addMember = async function (username) {
  try {
    this.members = this.members.concat({ member: username });
    await this.save();
    return username;
  } catch (error) {
    console.log("Error occured while adding member in club");
    console.log(error);
  }
};
clubSchema.methods.addNotification = async function (title, description) {
  try {
    this.notification = this.notification.concat({
      title: title,
      description: description,
    });
    await this.save();
    return this.notification;
  } catch (error) {
    console.log("Error occured while adding member in club");
    console.log(error);
  }
};

const addClub = new mongoose.model("club", clubSchema);
module.exports = addClub;
