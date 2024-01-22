const path = require("path");

const express = require("express");
const session = require('express-session')
const mongodbStore = require('connect-mongodb-session')


const defaultRoutes = require("./routes/default");
const db = require('./data/database')

const mongoDBStore = mongodbStore(session)

const app = express();

const sessionStore = new mongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName: 'cryptex',
  collection: 'sessions'
})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'super-secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}))

app.use("/", defaultRoutes);

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

db.connectToDatabase().then(function(){ 
  app.listen(3002);
})

