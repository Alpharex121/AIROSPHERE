require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;
const auth = require("./src/middleware/auth.js");
require("./src/db/connections.js");

const allowedOrigins = ["http://localhost:5173"];

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
const userRouter = require("./src/routes/userroute.js");
const studentconnectroute = require("./src/routes/studentconnectroute.js");
const resourcesroute = require("./src/routes/resourcesroute.js");
const notificationroute = require("./src/routes/notificationroute.js");
const clubroute = require("./src/routes/clubroute.js");
const authenticateroute = require("./src/routes/authenticateroute.js");
const academicroute = require("./src/routes/academicroute.js");
const requestRoute = require("./src/routes/requestRoute.js");

// Configuring routes
app.use("/user", userRouter);
app.use("/studentconnect", studentconnectroute);
app.use("/resource", resourcesroute);
app.use("/notification", notificationroute);
app.use("/club", clubroute);
app.use("/authenticate", authenticateroute);
app.use("/academic", academicroute);
app.use("/requests", requestRoute);

app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
