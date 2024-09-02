const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//GET ALL JOBS
router.get("/", async (req, res) => {});

//NEW JOB CREATION
router.post("/", auth, async (req, res) => {});

//UPDATE JOB INFORMATION
router.put("/:id", auth, async (req, res) => {});

//DELETE JOB
router.delete("/:id", auth, async (req, res) => {});

module.exports = router;
