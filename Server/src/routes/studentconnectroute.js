const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const addTeam = require("../models/findteamSchema");
const addPeer = require("../models/PeerProgramming");
const adddoubt = require("../models/doubt");

//GET TEAM REQUEST
router.get("/getteams", auth, async (req, res) => {
  const result = await addTeam.find().sort({ $natural: -1 });
  res.status(200).send(result);
  return;
});

//GET ALL YOUR CURRENT TEAM
router.get("/getteamreq/:username", auth, async (req, res) => {
  const result = await addTeam.find({ username: req.user.username });
  res.status(200).send(result);
  return;
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
    const result = await addTeam.find().sort({ $natural: -1 });

    console.log("team request uploaded successfully");
    res.status(200).send(result);
    return;
  } catch (error) {
    res.status(500).send("Error while uploading find team request");
    console.log(error);
    return;
  }
});

//UPDATE STUDENT CONNECT INFORMATION
router.put("/updateteampost/:postername/:postid", auth, async (req, res) => {
  if (req.user.role == "admin" || req.user.username == req.params.postername) {
    try {
      const postid = req.params.postid;
      if (!addTeam.findOne({ postid })) {
        res.status(409).send("team post not found for updation.");
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
      return;
    } catch (error) {
      res.status(500).send("error while updating the data" + error.message);
      return;
    }
  } else {
    console.log("Access denied");
    res.status(401).send("Access Denied");
    return;
  }
});

//DELETE TEAM Request
router.delete("/deleteteampost/:postid", auth, async (req, res) => {
  {
    try {
      const postid = req.params.postid;
      const isExist = await addTeam.findOne({ _id: postid });
      if (!isExist) {
        res.status(409).send("find team post not found");
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
        return;
      } else {
        res.status(401).send({ data: "permission denied" });
      }
    } catch (error) {
      res.status(500).send("Error occured while deleting find team post");
      console.log(error);
      return;
    }
  }
});

//PEER PROGRAMMING SECTION
//GET PEER REQUEST
router.get("/getpeer", auth, async (req, res) => {
  const result = await addPeer.find().sort({ $natural: -1 });
  res.status(200).send(result);
  return;
});

//GET ALL YOUR CURRENT PEER Request
router.get("/getpeerreq/:username", auth, async (req, res) => {
  const result = await addPeer.find({ postername: req.user.username });
  res.status(200).send(result);
  return;
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
    const result = await addPeer.find().sort({ $natural: -1 });
    console.log("peer request uploaded successfully");
    res.status(200).send(result);
    return;
  } catch (error) {
    console.log("Error while uploading peer request" + error);
    res.status(500).send("Error while uploading peer request");
    return;
  }
});

//UPDATE Peer Programming INFORMATION
router.put("/updatepeerreq/:postername/:postid", auth, async (req, res) => {
  const isExist = await addPeer.findOne({ _id: req.params.postid });
  if (!isExist) {
    res.status(409).send("find team post not found");
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
      return;
    } catch (error) {
      res.status(500).send("error while updating the data" + error.message);
      return;
    }
  } else {
    console.log("Access denied");
    res.status(401).send("Access Denied");
    return;
  }
});

//DELETE PEER Request
router.delete("/deletepeerpost/:postid", auth, async (req, res) => {
  {
    try {
      const postid = req.params.postid;
      const isExist = await addPeer.findOne({ _id: postid });
      if (!isExist) {
        res.status(409).send("find team post not found");
        return;
      }
      if (
        req.user.role == "admin" ||
        req.user.role === "disciplinemod" ||
        req.user.role === "modhead" ||
        req.user.username === isExist.postername
      ) {
        const result = await addPeer.findOneAndDelete({ _id: postid });
        const updated = await addPeer.find().sort({ $natural: -1 });
        console.log("User Delete successfully!" + result);
        res.status(200).send(updated);
        return;
      } else {
        res.status(401).send({ data: "permission denied" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Error occured while deleting find peer request");
      return;
    }
  }
});

//Ask Doubt  SECTION
//GET doubt REQUEST
router.get("/getdoubt", auth, async (req, res) => {
  const result = await adddoubt.find().sort({ $natural: -1 });
  res.status(200).send(result);
  return;
});
//GET ALL YOUR CURRENT dobut Request
router.get("/getdobut/:username", auth, async (req, res) => {
  const result = await adddoubt.find({ postername: req.user.username });
  res.status(200).send(result);
  return;
});

//Post doubt
router.post("/postdoubt", auth, async (req, res) => {
  try {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    const newdoubt = new adddoubt({
      title: req.body.title,
      description: req.body.description,
      postername: req.user.username,
      uploadtime: currentDate,
    });

    const registered = await newdoubt.save();
    const result = await adddoubt.find().sort({ $natural: -1 });

    res.status(200).send(result);
    console.log("doubt uploaded successfully");
    return;
  } catch (error) {
    res.status(500).send("Error while uploading doubt");
    console.log(error);
    return;
  }
});

// GET Comments of a post
router.get("/getcomment/:doubtid", auth, async (req, res) => {
  const result = await adddoubt.find({ _id: req.params.doubtid });
  res.status(200).send(result);
  return;
});

// Post comments
router.post("/postcomment/:doubtid", auth, async (req, res) => {
  try {
    const doubt = await adddoubt.findOne({ _id: req.params.doubtid });
    const postername = req.user.username;
    const description = req.body.description;
    const newcomment = doubt.addComment(postername, description);
    const commented = await doubt.save();
    res.status(200).send(commented);
    console.log("comment uploaded successfully");
    return;
  } catch (error) {
    res.status(500).send("Error while uploading comment");
    console.log(error);
    return;
  }
});

// //UPDATE doubt
// router.put("/updatedoubt/:doubtid", auth, async (req, res) => {
//   const doubt = await adddoubt.findOne({ _id: req.params.doubtid });
//   if (req.user.role == "admin" || req.user.username == doubt.postername) {
//     try {
//       const result = await adddoubt.findOneAndUpdate(
//         { _id: req.params.doubtid },
//         {
//           $set: {
//             title: req.body.title,
//             description: req.body.description,
//           },
//         }
//       );
//       console.log("update successful");
//       res.status(200).send(result);
//     } catch (error) {
//       res.status(500).send("error while updating the data" + error.message);
//     }
//   } else {
//     console.log("Access denied");
//     res.status(401).send("Access Denied");
//   }
// });

//DELETE doubt
router.delete("/deletedoubt/:postid", auth, async (req, res) => {
  {
    try {
      const postid = req.params.postid;
      const isExist = await adddoubt.findOne({ _id: postid });
      if (!isExist) {
        res.status(409).send("doubt not found");
        return;
      }
      if (
        req.user.role == "admin" ||
        req.user.role === "disciplinemod" ||
        req.user.role === "modhead" ||
        req.user.username === isExist.postername
      ) {
        const result = await adddoubt.findOneAndDelete({ _id: postid });
        console.log("Doubt Delete successfully!");
        res.status(200).send(result);
        return;
      } else {
        res.status(401).send({ data: "permission denied" });
        return;
      }
    } catch (error) {
      res.sendStatus(500).send("Error deleting doubt" + error);
      console.log(error);
      return;
    }
  }
});

module.exports = router;
