const express = require("express");
const { title } = require("process");
const path = require("path");
require("dotenv").config();
const user = require("./models/userModel");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let getUsers = await user.find();
  res.render("read", { getUsers });
});

app.post("/crush", async (req, res) => {
  try {
    const { name, email, imageurl } = req.body;
    let sendData = await user.create({
      name,
      email,
      imageurl,
    });

    res.redirect("/read");
  } catch (err) {
    console.log(err);
  }
});

app.get("/deluser/:id", async (req, res) => {
  let userDel = await user.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/upuser/:id", async (req, res) => {
  const userUp = await user.findOne({ _id: req.params.id });
  res.render("update", { userUp });
});

app.post("/edit/:id", async (req, res) => {
  const { name, email, imageurl } = req.body;
  const Edituser = await user.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, imageurl },
    { new: true },
  );
  res.redirect("/read");
});

app.listen(PORT, (req, res) => {
  console.log(`app is running on port: ${PORT}`);
});

module.exports = app;
