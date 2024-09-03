const express = require("express");
const router = express.Router();
const addClub = require("../models/clubSchema");
const userRegister = require("../models/userSchema");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const club = await addClub.find();
    res.send(club);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role === "admin" || req.user.role === "modhead") {
      const newClub = new addClub({
        name: req.body.name,
        description: req.body.description,
        head: req.body.head,
      });
      const registered = await newClub.save();
      res.status(200).send("club Added successfully" + registered);
      console.log("club Added successfully");
    } else {
      res.status(401).send("Access denied");
    }
  } catch (error) {
    console.log("Error occured while creating club" + error);
    res.status(400).send(error);
  }
});

router.delete("/:clubid", auth, async (req, res) => {
  if (req.user.role == "admin") {
    try {
      const clubid = req.params.clubid;
      const isExist = await addClub.findOne({ _id: clubid });
      if (!isExist) {
        res.send("club not found");
        return;
      }
      const result = await addClub.findOneAndDelete({ _id: clubid });
      res.status(200).send(result);
      console.log("club Delete successfully!");
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).send({ data: "permission denied" });
  }
});

// NOTIFICATION SECTION START FROM HERE

//club notification
router.get("/:clubid/notification", auth, async (req, res) => {
  try {
    const club = await addClub.findOne({ _id: req.params.clubid });
    const currclub = await club.notification;
    res.send(currclub);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/:clubid/notification", auth, async (req, res) => {
  const club = await addClub.findOne({ _id: req.params.clubid });
  console.log(club.head);
  if (
    req.user.role === "admin" ||
    (req.user.role == "head" && req.user.username === club.head)
  ) {
    try {
      const title = req.body.title;
      const description = req.body.description;
      const newMember = await club.addNotification(title, description);
      await club.save();
      res.status(200).send(newMember);
    } catch (error) {
      console.log(error);
      console.log("Error occured while adding notification");
      res.status(400).send(error);
    }
  } else {
    res.status(401).send("Permission denied.");
  }
});
router.delete(
  "/notificationdelete/:clubid/:notificationid",
  auth,
  async (req, res) => {
    const club = await addClub.findOne({ _id: req.params.clubid });
    if (
      req.user.role === "admin" ||
      (req.user.role == "head" && req.user.username === club.head)
    ) {
      try {
        club.notification = club.notification.filter((noti) => {
          console.log(noti._id);
          return noti._id.toString() !== req.params.notificationid;
        });
        await club.save();
        console.log("Notification deleted successfully");
        res.status(200).send(club.notification);
      } catch (error) {
        console.log(error);
        console.log("Error occured while deleting notification");
        res.status(400).send(error);
      }
    } else {
      res.status(401).send("Permission denied.");
    }
  }
);

//club addMember

//GET CLUB MEMEBER
router.get("/members/:clubid", auth, async (req, res) => {
  try {
    const club = await addClub.findOne({ _id: req.params.clubid });
    const currclub = await club.notification;
    res.send(currclub);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post("/addmember/:clubid/:username", auth, async (req, res) => {
  try {
    const userData = await addClub.findOne({ _id: req.params.clubid });
    const isExist = await userRegister.findOne({
      username: req.params.username,
    });
    if (isExist) {
      if (
        req.user.role === "admin" ||
        (req.user.role == "head" && req.user.username === userData.head)
      ) {
        try {
          const newMember = await userData.addMember(req.params.username);
          await userData.save();
          res.status(200).send(newMember);
        } catch (error) {
          console.log(error);
          console.log("Error occured while adding members");
          res.status(400).send(error);
        }
      } else {
        res.status(401).send("Permission denied.");
      }
    } else {
      res.status(500).send("User does not exist");
    }
  } catch (error) {
    console.log("user or club does not exist" + error);
    res.status(500).send("User does not exist");
  }
});

// club deleteMember
router.delete("/deletemember/:clubid/:username", auth, async (req, res) => {
  const memberlist = await addClub.findOne({ _id: req.params.clubid });
  if (!memberlist) res.status(500).send("Member not found");
  try {
    if (
      req.user.role === "admin" ||
      (req.user.role == "head" && req.user.username === memberlist.head)
    ) {
      memberlist.members = memberlist.members.filter((currElement) => {
        return currElement.member !== req.params.username;
      });

      await memberlist.save();
      console.log("Club member deleted successfully");
      res.send(memberlist);
    } else {
      res.send({ data: "permission denied" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while deleteing member from club");
  }
});

module.exports = router;
