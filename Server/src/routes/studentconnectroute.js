const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const addTeam = require("../models/findteamSchema");

//GET TEAM REQUEST
router.get("/getteams", auth, async (req, res) => {
  const result = await addTeam.find();
  res.status(200).send(result);
});

//GET ALL YOUR CURRENT TEAM
router.get("/getteamreq/:username", auth, async (req, res) => {
  const result = await addTeam.find({ username: req.params.username });
  res.status(200).send(result);
});

//NEW TEAM REQUEST
router.post("/postteam", auth, async (req, res) => {
  try {
    const newTeamReq = new addTeam({
      title: req.body.title,
      description: req.body.description,
      opening: req.body.opening,
      skills: req.body.skills,
      postername: req.user.postername,
    });

    const registered = await newTeamReq.save();

    res.status(200).send("Job posted successfully");
    console.log("team request uploaded successfully");
  } catch (error) {
    res.send("Error while uploading jobs");
    console.log(error);
  }
});

//UPDATE STUDENT CONNECT INFORMATION
router.put("/:postername/:postid", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.username == postername) {
    try {
      const postid = req.params.postid;
      if (!addTeam.findOne({ postid })) {
        res.send("jobs not found for updation.");
        return;
      }
      const result = await addTeam.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            opening: req.body.opening,
            skills: req.body.skills,
            postername: req.user.postername,
          },
        }
      );
      console.log("update successful");
      res.status(200).send(result);
    } catch (error) {
      response.send("error while updating the data");
    }
  } else {
  }
});

//DELETE JOB
router.delete("/:username/:postid", auth, async (req, res) => {
  {
    try {
      const userid = req.params.id;
      const isExist = await addTeam.findOne({ _id: postid });
      if (!isExist) {
        res.send("User not found");
        return;
      }
      if (
        req.user.role == "admin" ||
        req.user.role === "disciplinemod" ||
        req.user.role === "professor" ||
        req.user.role === "modhead" ||
        req.user.username === isExist.postername
      ) {
        const result = await addTeam.findOneAndDelete({ _id: postid });
        console.log("User Delete successfully!");
        res.status(200).send(result);
      } else {
        res.status(401).send({ data: "permission denied" });
      }
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
