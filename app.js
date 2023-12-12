const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/aml-kyc", function (req, res) {
  res.render("aml-kyc");
});

app.get("/contact-us", function (req, res) {
  res.render("contact-us");
});

app.get("/dashboard", function (req, res) {
  res.render("dashboard");
});

app.get("/deposit", function (req, res) {
  res.render("deposit");
});

app.get("/education", function (req, res) {
  res.render("education");
});

app.get("/faq", function (req, res) {
  res.render("FAQ");
});

app.get("/help", function (req, res) {
  res.render("help");
});

app.post("/help", function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");

  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.get("/history", function (req, res) {
  const filePath = path.join(__dirname, "data", "histories.json");

  const fileData = fs.readFileSync(filePath);
  const storedHistories = JSON.parse(fileData);

  res.render("history", {
    numberOfHistories: storedHistories.length,
    histories: storedHistories
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/markets", function (req, res) {
  res.render("markets");
});

app.get("/news", function (req, res) {
  res.render("news");
});

app.get("/packages", function (req, res) {
  res.render("packages");
});

app.get("/settings", function (req, res) {
  res.render("settings");
});

app.get("/signal", function (req, res) {
  res.render("signal");
});

app.get("/signup", function (req, res) {
  res.render("signup");
});

app.get("/transfer", function (req, res) {
  res.render("transfer");
});

app.get("/withdraw", function (req, res) {
  res.render("withdraw");
});

app.get("/404", function (req, res) {
  res.render("404");
});

app.listen(3000);
