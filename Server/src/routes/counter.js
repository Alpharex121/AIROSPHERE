require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const vercelEdge = require("@vercel/edge-config");
const edgeConfig = vercelEdge.createClient(process.env.ANOTHER_EDGE_CONFIG);

router.get("/", async (req, res) => {
  const count = await edgeConfig.get("airosphereCounter");
  console.log(count);
  res.json({ count });
});

router.post("/increment", async (req, res) => {
  try {
    let count = await edgeConfig.get("airosphereCounter");
    console.log(process.env.API_KEY_TOKEN + " " + process.env.CLIENT_ID);
    let newCount = count + 1;
    const updateEdgeConfig = await fetch(
      `https://api.vercel.com/v1/edge-config/${process.env.CLIENT_ID}/items`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.API_KEY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              operation: "update",
              key: "airosphereCounter",
              value: newCount,
            },
          ],
        }),
      }
    );
    const result = await updateEdgeConfig.json();
    console.log(result);
    count++;
    res.json({ count });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
