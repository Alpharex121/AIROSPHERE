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
router.get("/clubdetail/:clubname", auth, async (req, res) => {
  try {
    const club = await addClub.find({ name: req.params.clubname });
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
        headname: req.body.headname,
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

router.delete("/:clubname", auth, async (req, res) => {
  if (req.user.role == "admin") {
    try {
      const clubname = req.params.clubname;
      const isExist = await addClub.findOne({ name: clubname });
      if (!isExist) {
        res.send("club not found");
        return;
      }
      const result = await addClub.findOneAndDelete({ name: clubname });
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
router.get("/notification/:clubname", auth, async (req, res) => {
  try {
    const club = await addClub.findOne({ name: req.params.clubname });
    const currclub = await club.notification;
    res.send({ club: club, clubnoti: currclub });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/:clubname/notification", auth, async (req, res) => {
  const club = await addClub.findOne({ name: req.params.clubname });
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
  "/notificationdelete/:clubname/:notificationid",
  auth,
  async (req, res) => {
    const club = await addClub.findOne({ name: req.params.clubname });
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
router.get("/members/:clubname", auth, async (req, res) => {
  try {
    const club = await addClub.findOne({ name: req.params.clubname });
    const currclub = await club.members;
    res.send({ club: club, clubmember: currclub });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post("/addmember/:clubname", auth, async (req, res) => {
  try {
    const userData = await addClub.findOne({ name: req.body.clubname });
    const isExist = await userRegister.findOne({
      username: req.body.username,
    });
    if (isExist) {
      if (
        req.user.role === "admin" ||
        (req.user.role == "head" && req.user.username === userData.head)
      ) {
        try {
          const newMember = await userData.addMember(
            req.body.username,
            req.body.name,
            req.body.clubpost,
            req.body.clubrole
          );
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
router.delete("/deletemember/:clubname/:username", auth, async (req, res) => {
  const memberlist = await addClub.findOne({ name: req.params.clubname });
  if (!memberlist) res.status(500).send("Member not found");
  try {
    if (
      req.user.role === "admin" ||
      (req.user.role == "head" && req.user.username === memberlist.head)
    ) {
      memberlist.members = memberlist.members.filter((currElement) => {
        return currElement.username !== req.params.username;
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
