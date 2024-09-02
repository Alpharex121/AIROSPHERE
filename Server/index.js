require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;
// const auth = require("./middleware/auth.js");
// require("./db/Connection.js");

const allowedOrigins = [
  "https://ggits-coding-club.vercel.app",
  "https://www.dpcoding.club",
];

const corsOptionss = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PUT, DELETE, HEAD",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
});

app.use(cors(corsOptionss));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Importing routes
const userRouter = require("./routes/userroute.js");
const studentconnectroute = require("./routes/studentconnectroute.js");
const resourcesroute = require("./routes/resourcesroute.js");
const notificationroute = require("./routes/notificationroute.js");
const clubroute = require("./routes/clubroute.js");
const authenticateroute = require("./routes/authenticateroute.js");
const adminroute = require("./routes/adminroute.js");
const academinroute = require("./routes/academinroute.js");

// Configuring routes
app.use("/user", userRouter);
app.use("/studentconnect", studentconnectroute);
app.use("/resource", resourcesroute);
app.use("/notification", notificationroute);
app.use("/clubroute", clubroute);
app.use("/authenticate", authenticateroute);
app.use("/admin", adminroute);
app.use("/academic", academinroute);

app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
