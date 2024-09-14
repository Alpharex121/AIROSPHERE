require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const addCounter = require("../models/counterSchema");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const id = "66e5a2a9975780a89a7f42bc";
    const counter = await addCounter.findOne({ _id: id });

    res.status(200).send(counter?.counter);
  } catch (error) {
    console.log("Error fetching counter " + error);
  }
});

router.put("/increment", async (req, res) => {
  try {
    const id = "66e5a2a9975780a89a7f42bc";
    const count = await addCounter.findOne({ _id: id });
    const currCounter = Number(count.counter);

    const result = await addCounter.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          counter: currCounter + 1,
        },
      }
    );

    res.status(200).send("counter updated successfully!");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
