const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const saltRounds = 10;
const port = process.env.PORT;
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const User = require("./models/User");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

mongoose.connect(process.env.MONGO_URL, {}).then(() => {
  console.log("database up");
});

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
app.get("/", async (req, res) => {
  const user = await User.find();
  res.json(user);
});

app.post("/register", (req, res) => {
  if (
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.username ||
    !req.body.password
  ) {
    res.status(404).json({ status: "error", error: "Invalid Credentials!" });
  } else {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hash,
      });
      newUser.save();

      res.status(200).json({ status: "ok", error: "Registered" });
    });
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
  });

  if (!username || !password) {
    res.status(404).json({ status: "error", error: "Invalid Credentials!" });
  } else {
    if (user == null) {
      res.status(404).json({ status: "error", error: "Invalid Credentials!" });
    }
    const isUser = await comparePassword(password, user.password);

    if (isUser) {
      res.status(200).json({ status: "ok" });
    } else if (isUser === null) {
      res.status(404).json({ status: "error", error: "Invalid Credentials!" });
    } else {
      res.status(404).json({ status: "error", error: "Invalid Credentials!" });
    }
  }
});

app.listen(process.env.PORT, () => {
  console.log("backend up");
});
