const express = require("express");
const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");

const db = require("../data/database");

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/aml-kyc", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  res.render("aml-kyc");
});

router.get("/contact-us", function (req, res) {
  res.render("contact-us");
});

router.get("/dashboard", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  res.render("dashboard");
});

router.get("/deposit", async function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  const assets = await db.getDb().collection("assets").find().toArray();
  res.render("deposit", { assets: assets });
});

router.post("/deposit", async function (req, res) {
  const assetsId = new ObjectId(req.body.assets);

  const asset = await db
    .getDb()
    .collection("assets")
    .findOne({ _id: assetsId });

  const newHistory = {
    amount: req.body.amount,
    action: req.body.action,
    status: req.body.status,
    statusT: req.body.statusT,
    date: new Date(),
    assets: {
      id: assetsId,
      name: asset.name,
      value: asset.value,
    },
  };

  const result = await db.getDb().collection("history").insertOne(newHistory);
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 10; j++) {
      console.log(`${i}, + ${j}`, i + j);
    }
  }
  res.redirect("/history");
});

router.get("/education", function (req, res) {
  res.render("education");
});

router.get("/faq", function (req, res) {
  res.render("FAQ");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

router.get("/login", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;

  res.render("login", { inputData: sessionInputData });
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "Couldn't log in - Check credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return
  }

  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Couldn't log in - Check credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    });
    return
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/dashboard");
  });
});

router.get("/markets", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  res.render("markets");
});

router.get("/news", function (req, res) {
  res.render("news");
});

router.get("/packages", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  res.render("packages");
});

router.get("/settings", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  res.render("settings");
});

router.get("/signal", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  res.render("signal");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }

  req.session.inputData = null;

  res.render("signup", { inputData: sessionInputData });
});

router.post("/signup", async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 6 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid input - please check your data!",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };

    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User exists already!",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.get("/transfer", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  res.render("transfer");
});

router.get("/withdraw", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  res.render("withdraw");
});

router.get("/help", function (req, res) {
  res.render("help");
});

router.post("/help", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  res.redirect("/confirm");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/login");
});

router.get("/history", async function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  const histories = await db.getDb().collection("history").find().toArray();

  histories.sort(function (resA, resB) {
    if (resA.date > resB.date) {
      return -1;
    }
    return 1;
  });

  res.render("history", {
    numberOfHistories: histories.length,
    histories: histories,
  });
});

module.exports = router;
