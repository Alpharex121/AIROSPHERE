const express = require("express");
const router = express.Router();
const userRegister = require("../models/userSchema");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

//GET ALL STUDENTS
router.get("/getallstudents", auth, async (req, res) => {
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

router.get("/getcurruser", auth, async (req, res) => {
  res.send(req.user);
});

//NEW USER STUDENTS
router.post("/adduser", auth, async (req, res) => {
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

      if (req.body.role === "admin") {
        res.status(401).send("Permission denied");
        return;
      }

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
          res.status(500).send("user already exist");
          return;
        }

        const registered = await newUser.save();

        console.log("user registered successful" + registered);
        res.status(200).send("user created successfully" + registered);
      } else {
        res.status(500).send("Password does not match");
      }
    } catch (error) {
      res.status(500).send("Erro occured while adding student" + error);
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

//UPDATE STUDENT DATA
router.put("/update/:username/:id", auth, async (req, res) => {
  try {
    (password = req.body.password),
      (confirmpassword = req.body.confirmpassword);
    if (password != confirmpassword) {
      res.status(400).send({ data: "password not matched" });
    }

    if (
      req.user.role === "admin" ||
      req.user.role === "discriplinemod" ||
      req.user.role === "headmod" ||
      req.user.role === "professor" ||
      req.user.username === req.params.username
    ) {
      const userid = req.params.id;
      const isExist = await userRegister.findOne({ _id: userid });
      if (!isExist) {
        res.send("user not found for updation.");
        return;
      }
      console.log(isExist);
      if (isExist.role === "admin") {
        res.status(401).send("Permission denied");
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
      return;
    } else {
      res.status(401).send({ data: "permission denied" });
    }
  } catch (error) {
    res.send("error while updating the data");
    console.log(error);
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
      if (isExist.role === "admin") {
        res.status(401).send("Permission denied");
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
router.put("/updatepassword/:username", auth, async (req, res) => {
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  try {
    if (password != confirmpassword) {
      res.status(400).send({ data: "password not matched" });
    }

    if (
      req.user.username === req.params.username ||
      req.user.role === "admin" ||
      req.user.role === "professor" ||
      req.user.role === "disciplinemod"
    ) {
      const isExist = await userRegister.findOne({
        username: req.params.username,
      });
      if (!isExist) {
        res.send("User not found");
        return;
      }
      if (isExist.role === "admin" && req.user.role !== "admin") {
        res.status(401).send("Permission denied");
        return;
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const hashedConfirmPassword = await bcrypt.hash(
        req.body.confirmpassword,
        10
      );

      const result = await userRegister.findOneAndUpdate(
        { username: req.params.username },
        {
          $set: {
            password: hashedPassword,
            confirmpassword: hashedConfirmPassword,
          },
        },
        {
          new: true,
        }
      );
      console.log("password update successful");
      res.status(200).send(result);
    } else {
      res.status(401).send("Permission denied");
    }
  } catch (error) {
    res.status(400).send("error while updating the password");
    console.log(error.message);
  }
});

module.exports = router;
