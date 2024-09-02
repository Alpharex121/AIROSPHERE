const express = require("express");
const router = express.Router();
const userRegister = require("../models/userSchema");
const auth = require("../middleware/auth");
const { route } = require("./academicroute");

//GET ALL STUDENTS
router.get("/", auth, async (req, res) => {
  if (
    req.user.role == "admin" ||
    req.user.role === "disciplinemod" ||
    req.user.role === "professor" ||
    req.user.role === "modhead"
  ) {
    const result = await userRegister.find();
    res.status(200).send(result);
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//NEW USER STUDENTS
router.post("/", auth, async (req, res) => {
  if (
    req.user.role == "admin" ||
    req.user.role === "disciplinemod" ||
    req.user.role === "professor" ||
    req.user.role === "modhead"
  ) {
    try {
      const password = req.body.password;
      const confirmpassword = req.body.confirmpassword;
      const username = req.body.username;

      if (req.body.role === "admin" && req.user.role !== "admin")
        res.status(401).send("Permission denied");

      if (password === confirmpassword) {
        const newUser = new userRegister({
          username: req.body.username,
          role: req.body.role,
          password: req.body.password,
          confirmpassword: req.body.confirmpassword,
          name: req.body.name,
          mail: req.body.mail,
          semester: req.body.semester,
          enrollmentno: req.body.enrollmentno,
        });

        const isRegisterd = await userRegister.findOne({
          username: username,
        });
        if (isRegisterd) {
          res.send("user already exist");
          return;
        }

        const registered = await newUser.save();

        res.status(200).send("user created successfully");
        console.log("user registered successful");
      } else {
        res.send("Password does not match");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//UPDATE STUDENT DATA
router.put("/:username/:id", auth, async (req, res) => {
  (password = req.body.password), (confirmpassword = req.body.confirmpassword);
  if (password != confirmpassword) {
    res.status(400).send({ data: "password not matched" });
  }
  if (
    req.user.role == "admin" ||
    req.user.role === "disciplinemod" ||
    req.user.role === "professor" ||
    req.user.role === "modhead" ||
    req.user.username === req.params.username
  ) {
    try {
      if (req.body.role === "admin" && req.user.role !== "admin")
        res.status(401).send("Permission denied");
      const userid = req.params.id;
      if (!userRegister.findOne({ userid })) {
        res.send("user not found for updation.");
        return;
      }
      const result = await userRegister.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            username: req.body.username,
            role: req.body.role,
            name: req.body.name,
            mail: req.body.mail,
            semester: req.body.semester,
            enrollmentno: req.body.enrollmentno,
          },
        }
      );
      console.log("update successful");
      res.status(200).send(result);
    } catch (error) {
      res.send("error while updating the data");
      // console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//DELETE STUDENT
router.delete("/:id", auth, async (req, res) => {
  if (
    req.user.role == "admin" ||
    req.user.role === "disciplinemod" ||
    req.user.role === "professor" ||
    req.user.role === "modhead"
  ) {
    try {
      const userid = req.params.id;
      const isExist = await userRegister.findOne({ _id: userid });
      if (!isExist) {
        res.send("User not found");
        return;
      }
      const result = await userRegister.findOneAndDelete({ _id: userid });
      res.status(200).send(result);
      console.log("User Delete successfully!");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//UPDATE PASSWORD
router.put("/updatepassword/:username/:id", auth, async (req, res) => {
  (password = req.body.password), (confirmpassword = req.body.confirmpassword);
  if (password != confirmpassword) {
    res.status(400).send({ data: "password not matched" });
  }
  try {
    if (req.user.username === req.params.username) {
      const userid = req.params.id;
      if (!userRegister.findOne({ userid })) {
        res.send("user not found for updation.");
        return;
      }
      const currUser = userRegister.findOne({ userid });

      const result = await userRegister.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
          },
        }
      );
      console.log("password update successful");
      res.status(200).send(result);
    }
  } catch (error) {
    res.send("error while updating the password");
    console.log(error);
  }
});

module.exports = router;
