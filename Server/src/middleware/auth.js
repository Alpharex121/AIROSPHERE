require("dotenv").config();
const jwt = require("jsonwebtoken");
const addUser = require("../models/userSchema");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
      const user = await addUser.findOne({ _id: verifyUser._id });
      req.token = token;
      req.user = user;
      // console.log("user verified ");
      next();
    } else {
      console.log("user not verified");
      res.status(401).send({ data: "user not verified" });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error occured while authenticating user");
    return;
  }
};

module.exports = auth;
