const express = require("express");
const router = express.Router();
const addResource = require("../models/resourcesSchema");
const auth = require("../middleware/auth");
const addRequest = require("../models/RequestSchema");

//GET Resource
router.get("/", auth, async (req, res) => {
  if (
    req.user.role === "admin" ||
    req.user.role === "modhead" ||
    req.user.role === "studentmanagemod" ||
    req.user.role === "professor"
  ) {
    const result = await addRequest.find();
    res.status(200).send(result);
  } else {
    res.status(401).send("Permission Denied");
  }
});

//ADD Request
router.post("/", async (req, res) => {
  try {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    const newRequest = new addRequest({
      username: req.body.username,
      name: req.body.name,
      mail: req.body.mail,
      semester: req.body.semester,
      enrollmentno: req.body.enrollmentno,
      requeston: currentDate,
    });

    const isRequested = await addRequest.findOne({
      username: req.body.username,
    });
    if (isRequested) {
      res.send("user already requested");
      return;
    }

    const request = await newRequest.save();

    console.log("request added successful" + request);
    res.status(200).send("request created successfully" + request);
  } catch (error) {
    console.log(error);
  }
});

//DELETE Request
router.delete("/:requestid", auth, async (req, res) => {
  try {
    if (
      req.user.role === "admin" ||
      req.user.role === "modhead" ||
      req.user.role === "resourcemod"
    ) {
      const requestid = req.params.requestid;
      const isExist = await addRequest.findOne({ _id: requestid });
      if (!isExist) {
        res.send("request not found");
        return;
      }
      const result = await addRequest.findOneAndDelete({
        _id: requestid,
      });
      console.log("request Delete successfully!");
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send("Error while deleting request" + error.message);
  }
});

module.exports = router;