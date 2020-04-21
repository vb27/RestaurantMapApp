const db = require("../models");

const express = require("express");

const router = express.Router();


router.get("/", function(req, res) {  
    res.render("index");
  });

router.post("/api/newuser", function(req, res){
  db.User.create({ 
    userName: req.body.userName,
    userPassword: req.body.userPass
  }).then(function() {
      res.redirect("/");
    });
});




module.exports = router;


