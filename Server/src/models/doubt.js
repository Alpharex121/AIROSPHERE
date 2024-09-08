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
  vote : [
    {
    upvote: {
      type: String,
    },
    downvote: {
      type: String,
    },
}
  ]
});

const adddoubt = new mongoose.model("askdoubt", doubtSchema);
module.exports = adddoubt;
