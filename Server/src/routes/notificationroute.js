const express = require("express");
const sendpulse = require("sendpulse-api");
const router = express.Router();
const auth = require("../middleware/auth");
const nodemailer = require("nodemailer");
const addNotification = require("../models/notificationSchema");
const userRegister = require("../models/userSchema");
// const mailjet = require("node-mailjet").connect(
//   process.env.MJ_APIKEY_PUBLIC,
//   process.env.MJ_APIKEY_PRIVATE
// );
const fetchUserEmails = async () => {
  try {
    // Fetch all users' emails from the database
    const users = await userRegister.find({ role: "user" }, "mail"); // Fetch only the 'email' field
    return users.map((user) => user.mail); // Extract the email addresses
  } catch (error) {
    console.error("Error fetching user emails:", error);
    return [];
  }
};

const generateMailTemplate = (notificationTitle, type) => {
  return `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Hello ,</h2>
            <p>We hope this message finds you well!</p>
            <p>We are excited to inform you that a new ${type} update has been posted:</p>
            <h3 style="color: #007BFF;">${notificationTitle}</h3>
            <p>Thank you for being an active member of our platform.</p>
            <p>Best Regards,</p>
            <p><b>Airosphere Team</b></p>
        </div>
    `;
};

const sendBulkEmails = async (subject, type) => {
  const emails = await fetchUserEmails();
  const messages = emails.map((email) => ({
    From: {
      Email: "airosphere01@gmail.com", // Your verified sender email
      Name: "Airosphere",
    },
    To: [
      {
        Email: email,
      },
    ],
    Subject: subject,
    HTMLPart: generateMailTemplate(subject, type), // HTML content for the email
  }));

  try {
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: messages,
    });
    console.log("Emails sent successfully", result.body);
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

//GET NOTIFICATION
router.get("/:type", async (req, res) => {
  const result = await addNotification.find({ type: req.params.type });
  res.status(200).send(result);
  return;
});

//NEW NOTIFICATION CREATION
router.post("/", auth, async (req, res) => {
  try {
    if (
      req.user.role === "admin" ||
      req.user.role === "modhead" ||
      req.user.role === "professor" ||
      req.user.role === "updatemod"
    ) {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      let currentDate = `${day}-${month}-${year}`;
      const newNotification = new addNotification({
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        uploaddate: currentDate,
      });

      const registered = await newNotification.save();
      console.log("New notificaiton added successfully!");
      // sendBulkEmails(req.body.title, req.body.type);
      res.status(200).send("Notification added successfully!");
      return;
    } else {
      console.log("permission denied");
      res.status(401).send({ data: "permission denied" });
      return;
    }
  } catch (error) {
    console.log("Error while generating notification." + error);
    res.status(500).send("Error while adding notification");
    return;
  }
});

//DELETE NOTIFICATION
router.delete("/:notificationid", auth, async (req, res) => {
  if (
    req.user.role === "admin" ||
    req.user.role === "modhead" ||
    req.user.role === "professor" ||
    req.user.role === "updatemod"
  ) {
    try {
      const notificationid = req.params.notificationid;
      const isExist = await addNotification.findOne({ _id: notificationid });
      if (!isExist) {
        res.status(409).send("Notification not found");
        return;
      }
      const result = await addNotification.findOneAndDelete({
        _id: notificationid,
      });
      res.status(200).send(result);
      console.log("Notification Delete successfully!");
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while deleting notification");
      return;
    }
  } else {
    res.status(401).send({ data: "permission denied" });
    return;
  }
});

module.exports = router;
