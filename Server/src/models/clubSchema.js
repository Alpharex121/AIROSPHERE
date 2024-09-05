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
  headname: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
  members: [
    {
      name: {
        type: String,
      },
      username: {
        type: String,
      },
      clubpost: {
        type: String,
      },
      clubrole: {
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
      uploadtime: {
        type: String,
      },
    },
  ],
});

clubSchema.methods.addMember = async function (
  username,
  name,
  clubpost,
  clubrole
) {
  try {
    this.members = this.members.concat({
      username: username,
      name: name,
      clubpost: clubpost,
      clubrole: clubrole,
    });
    await this.save();
    return this.members;
  } catch (error) {
    console.log("Error occured while adding member in club");
    console.log(error);
  }
};
clubSchema.methods.addNotification = async function (title, description) {
  try {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    this.notification = this.notification.concat({
      title: title,
      description: description,
      uploadtime: currentDate,
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
