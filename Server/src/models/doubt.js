require("dotenv").config();
const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  postername: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  uploadtime: {
    type: String,
  },
  tag: {
    type: String,
  },
  comments: [
    {
      postername: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      uploadtime: {
        type: String,
      },
    },
  ],
});

doubtSchema.methods.addComment = async function (postername, description) {
  try {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    this.comments = this.comments.concat({
      postername: postername,
      description: description,
      uploadtime: currentDate,
    });
    return this.comments;
  } catch (error) {
    console.log("Error occured while adding comments in doubt");
    console.log(error);
  }
};

const adddoubt = new mongoose.model("askdoubt", doubtSchema);
module.exports = adddoubt;
