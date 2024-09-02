const express = require("express");
const router = express.Router();
const addClub = require("../models/clubSchema");
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
        title: req.body.username,
        description: req.body.role,
        head: req.body.password,
      });
      const registered = await addClub.save();
      res.status(200).send("club Added successfully");
      console.log("club Added successfully");
      res.send(club);
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
      const isExist = await userRegister.findOne({ _id: clubid });
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

router.get("/", auth, async (req, res) => {
  try {
    const club = await addClub.find();
    res.send(club);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//club notification
router.get("/", auth, async (req, res) => {
  try {
    const club = await Club.findById(req.club._id);
    res.send(club.notifications);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//club events
router.get("/", auth, async (req, res) => {
  try {
    const club = await Club.findById(req.club._id);
    res.send(club.events);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//club addMember
router.post("/:username", auth, async (req, res) => {
  try {
    const club = await Club.findById(req.club._id);
    club.members.push(req.params.username);
    await club.save();
    res.send(club);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// club deleteMember
router.delete("/:username", auth, async (req, res) => {
  try {
    const club = await Club.findById(req.club._id);
    club.members = club.members.filter(
      (member) => member !== req.params.username
    );
    await club.save();
    res.send(club);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
