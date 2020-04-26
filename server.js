const express = require("express");
const exphbs = require("express-handlebars");
// const dotenv = require('dotenv').config({path: __dirname + '/.env'});
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 8080;

// Requiring our models for syncing
const db = require("./models");
const session =require("express-session");
var SequelizeStore = require('connect-session-sequelize')(session.Store);



// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  // secret: process.env.SESSION_SECRET,
  secret:"tacocat",
  store: new SequelizeStore({
      db: db.sequelize
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 7200000
  }
}))


// Sets handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Static directory
app.use(express.static("public"));


let routes = require("./routes/myroutes.js");
app.use(routes);


db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
  });
});
