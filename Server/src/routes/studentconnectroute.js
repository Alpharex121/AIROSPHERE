const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const addTeam = require("../models/findteamSchema");
const addPeer = require("../models/PeerProgramming");
const adddoubt  = require("../models/doubt");

//GET TEAM REQUEST
router.get("/getteams", auth, async (req, res) => {
  const result = await addTeam.find();
  res.status(200).send(result);
}); 

//GET ALL YOUR CURRENT TEAM
router.get("/getteamreq/:username", auth, async (req, res) => {
  const result = await addTeam.find({ username: req.user.username });
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
      postername: req.user.username,
      link: req.body.link,
    });

    const registered = await newTeamReq.save();

    res.status(200).send("find team posted successfully");
    console.log("team request uploaded successfully");
  } catch (error) {
    res.send("Error while uploading find team request");
    console.log(error);
  }
});

//UPDATE STUDENT CONNECT INFORMATION
router.put("/updateteampost/:postername/:postid", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.username == req.params.postername) {
    try {
      const postid = req.params.postid;
      if (!addTeam.findOne({ postid })) {
        res.send("team post not found for updation.");
        return;
      }
      const result = await addTeam.findOneAndUpdate(
        { _id: req.params.postid },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            opening: req.body.opening,
            skills: req.body.skills,
            link: req.body.link,
          },
        }
      );
      console.log("update successful");
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("error while updating the data" + error.message);
    }
  } else {
    console.log("Access denied");
    res.status(401).send("Access Denied");
  }
});

//DELETE TEAM Request
router.delete("/deleteteampost/:postid", auth, async (req, res) => {
  {
    try {
      const postid = req.params.postid;
      const isExist = await addTeam.findOne({ _id: postid });
      if (!isExist) {
        res.send("find team post not found");
        return;
      }
      if (
        req.user.role == "admin" ||
        req.user.role === "disciplinemod" ||
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

//PEER PROGRAMMING SECTION
//GET PEER REQUEST
router.get("/getpeer", auth, async (req, res) => {
  const result = await addPeer.find();
  res.status(200).send(result);
});

//GET ALL YOUR CURRENT PEER Request
router.get("/getpeerreq/:username", auth, async (req, res) => {
  const result = await addPeer.find({ postername: req.user.username });
  res.status(200).send(result);
});

//NEW Peer REQUEST
router.post("/postpeer", auth, async (req, res) => {
  try {
    const newPeerReq = new addPeer({
      title: req.body.title,
      description: req.body.description,
      skills: req.body.skills,
      link: req.body.link,
      postername: req.user.username,
    });

    const registered = await newPeerReq.save();

    res.status(200).send("find peer posted successfully");
    console.log("peer request uploaded successfully");
  } catch (error) {
    res.send("Error while uploading peer request");
    console.log(error);
  }
});

//UPDATE Peer Programming INFORMATION
router.put("/updatepeerreq/:postername/:postid", auth, async (req, res) => {
  const isExist = await addPeer.findOne({ _id: req.params.postid });
  if (!isExist) {
    res.status(500).send("find team post not found");
    return;
  }
  if (req.user.role == "admin" || req.user.username == req.isExist.postername) {
    try {
      const result = await addPeer.findOneAndUpdate(
        { _id: req.params.postid },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            opening: req.body.opening,
            link: req.body.link,
            skills: req.body.skills,
          },
        }
      );
      console.log("update successful");
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("error while updating the data" + error.message);
    }
  } else {
    console.log("Access denied");
    res.status(401).send("Access Denied");
  }
});

//DELETE PEER Request
router.delete("/deletepeerpost/:postid", auth, async (req, res) => {
  {
    try {
      const postid = req.params.postid;
      const isExist = await addPeer.findOne({ _id: postid });
      if (!isExist) {
        res.send("find team post not found");
        return;
      }
      if (
        req.user.role == "admin" ||
        req.user.role === "disciplinemod" ||
        req.user.role === "modhead" ||
        req.user.username === isExist.postername
      ) {
        const result = await addPeer.findOneAndDelete({ _id: postid });
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
//Ask Doubt  SECTION
//GET doubt REQUEST
router.get("/getdoubt", auth, async (req, res) => {
  const result = await adddoubt.find();
  res.status(200).send(result);
});
//GET ALL YOUR CURRENT dobut Request
router.get("/getdobut/:username", auth, async (req, res) => {
  const result = await adddoubt.find({ postername: req.user.username });
  res.status(200).send(result);
});

//Post doubt
router.post("/postdoubt", auth, async (req, res) => {
  try {
    const newdoubt = new adddoubt({
      title: req.body.title,
      description: req.body.description,
      postername: req.user.username,
    });

    const registered = await newdoubt.save();

    res.status(200).send("doubt posted successfully");
    console.log("doubt uploaded successfully");
  } catch (error) {
    res.send("Error while uploading doubt");
    console.log(error);
  }
});
// GET Comments
router.post("/getcomment/:username", auth, async (req, res) => {
  const result = await adddoubt.find({ postername: req.user.username });
  res.status(200).send(result);
});
// Post comments
router.post("/postcomment", auth, async (req, res) => {
  try {
    const newcomment = new adddoubt({
      comment: req.body.comment,
      postername: req.user.username,
    });

    const registered = await newcomment.save();

    res.status(200).send("comment posted successfully");
    console.log("comment uploaded successfully");
  } catch (error) {
    res.send("Error while uploading comment");
    console.log(error);
  }
});
//Post vote 
router.post("/postvote", auth, async (req, res) => {
  try {
    const newvote = new adddoubt({
      vote: req.body.vote,
      postername: req.user.username,
    });

    const registered = await newvote.save();

    res.status(200).send("vote posted successfully");
    console.log("vote uploaded successfully");
  } catch (error) {
    res.send("Error while uploading vote");
    console.log(error);
  }
});

// GET vote
router.get("/getvote", auth, async (req, res) => {
  const result = await adddoubt.find({ vote: req.body.vote });
  res.status(200).send(result);
});

//UPDATE doubt
router.put("/updatedoubt/", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.username == req.body.postername) {
    try {
      const result = await adddoubt.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
          },
        }
      );
      console.log("update successful");
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("error while updating the data" + error.message);
    }
  } else {
    console.log("Access denied");
    res.status(401).send("Access Denied");
  }
});


//DELETE doubt
router.delete("/deletedoubt/:postid", auth, async (req, res) => {
  {
    try {
      const postid = req.params.postid;
      const isExist = await adddoubt.findOne({ _id: postid });
      if (!isExist) {
        res.send("find team post not found");
        return;
      }
      if (
        req.user.role == "admin" ||
        req.user.role === "disciplinemod" ||
        req.user.role === "modhead" ||
        req.user.username === isExist.postername
      ) {
        const result = await adddoubt.findOneAndDelete({ _id: postid });
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
