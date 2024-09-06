const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const addNotification = require("../models/notificationSchema");

//GET NOTIFICATION
router.get("/:type", async (req, res) => {
  const result = await addNotification.find({ type: req.params.type });
  res.status(200).send(result);
});

//NEW NOTIFICATION CREATION
router.post("/", auth, async (req, res) => {
  try {
    if (
      req.user.role === "admin" ||
      req.user.role === "headmod" ||
      req.user.role === "professor" ||
      req.user.role === "professormod"
    ) {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let currentDate = `${day}-${month}-${year}`;
      const newNotification = new addNotification({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        uploaddate: currentDate,
      });

      const registered = await newNotification.save();
      console.log("New notificaiton added successfully!");
      res.status(200).send("Notification added successfully!");
    } else {
      console.log("permission denied");
      res.status(401).send({ data: "permission denied" });
    }
  } catch (error) {
    console.log("Error while generating notification." + error);
  }
});

//DELETE NOTIFICATION
router.delete("/:notificationid", auth, async (req, res) => {
  if (
    req.user.role === "admin" ||
    req.user.role === "headmod" ||
    req.user.role === "professor" ||
    req.user.role === "professormod"
  ) {
    try {
      const notificationid = req.params.notificationid;
      const isExist = await addNotification.findOne({ _id: notificationid });
      if (!isExist) {
        res.send("Notification not found");
        return;
      }
      const result = await addNotification.findOneAndDelete({
        _id: notificationid,
      });
      res.status(200).send(result);
      console.log("Notification Delete successfully!");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

module.exports = router;
