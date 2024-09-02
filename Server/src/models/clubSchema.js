require("dotenv").config();
const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true,
  },
  head : {
    type: String,
    required: true,
  },
 
  discription : {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
 
});

userSchema.methods.addMember = async function () {
    try {
      this.tokens = this.tokens.concat({ token });
      await this.save();
      return token;
    } catch (error) {
      console.log("Error occured while generating token");
      console.log(error);
    }
};

const addClub = new mongoose.model("club", clubSchema);
module.exports = addClub;
