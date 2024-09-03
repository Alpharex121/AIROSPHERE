const express = require("express");
const router = express.Router();
const addResource = require("../models/resourcesSchema");
const auth = require("../middleware/auth");

//GET Resource
router.get("/", auth, async (req, res) => {
  const result = await addResource.find();
  res.status(200).send(result);
});

//ADD Resource
router.post("/", auth, async (req, res) => {
  try {
    if (
      req.user.role === "admin" ||
      req.user.role === "modhead" ||
      req.user.role === "resourcemod"
    ) {
      const newResource = new addResource({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        type: req.body.type,
      });
      await newResource.save();
      res.send(newResource);
    } else {
      res.status(401).send("Permission Denied");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//DELETE Resource
router.delete("/:resourceid", auth, async (req, res) => {
  try {
    if (
      req.user.role === "admin" ||
      req.user.role === "modhead" ||
      req.user.role === "resourcemod"
    ) {
      const resourceid = req.params.resourceid;
      const isExist = await addResource.findOne({ _id: resourceid });
      if (!isExist) {
        res.send("Resource not found");
        return;
      }
      const result = await addResource.findOneAndDelete({
        _id: resourceid,
      });
      console.log("Resource Delete successfully!");
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send("Error while deleting resourse" + error.message);
  }
});

module.exports = router;
