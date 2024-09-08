const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const addAcademic = require("../models/academicSchema");

//GET ALL ACADEMIC
router.get("/:type/:subcode", async (req, res) => {
  const result = await addAcademic.find({
    type: req.params.type,
    subcode: req.params.subcode,
  });
  res.status(200).send(result);
});

//NEW ACADEMIC CREATION
router.post("/", auth, async (req, res) => {
  if (
    req.user.role === "admin" ||
    req.user.role === "modhead" ||
    req.user.role === "academicmod" ||
    req.user.role === "professor"
  ) {
    try {
      const newAcademic = new addAcademic({
        title: req.body.title,
        description: req.body.description,
        semester: req.body.semester,
        subject: req.body.subject,
        subcode: req.body.subcode,
        link: req.body.link,
        type: req.body.type,
      });
      const result = await newAcademic.save();
      res.status(200).send(result);
    } catch (error) {
      console.log("Error while adding academic.");
      res.status(500).send(error.message);
    }
  } else {
    res.status(401).send("Permission Denied");
  }
});

//DELETE ACADEMIC
router.delete("/:academicid", auth, async (req, res) => {
  if (
    req.user.role === "admin" ||
    req.user.role === "modhead" ||
    req.user.role === "academicmod" ||
    req.user.role === "proffersor"
  ) {
    try {
      const academicid = req.params.academicid;
      const isExist = await addAcademic.findOne({ _id: academicid });
      if (!isExist) {
        res.status(409).send("Academic data not found");
        return;
      }
      const result = await addAcademic.findOneAndDelete({
        _id: academicid,
      });
      console.log("Acedemic Delete successfully!");
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send("Error while deleting academic" + error.message);
    }
  } else {
    res.status(401).send("Permission denied");
  }
});

module.exports = router;
