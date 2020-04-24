const db = require("../models");

const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");


// First page (login)
router.get("/", function (req, res) {
    res.render("index");
});

router.get("/signup", function (req, res) {
    res.render("signup");
});

router.post("/signup", function (req, res) {
    console.log("reg.body:", req.body);
    db.user.create({
        username: req.body.username,
        password: req.body.password
    }).then(newUser => {
        // res.json(newUser)

        req.session.user = {
            username: newUser.username,
            id: newUser.userId
        };
        res.redirect("/locations/user");


    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



// Login
router.get("/login", function (req, res) {
    res.render("index");
});

router.post("/login", function (req, res) {
    db.user.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUser => {
        if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            req.session.user = {
                username: dbUser.username,
                id: dbUser.userId
            };
            // res.send("logged in!")
            res.redirect('/locations/user');
        } else {
            res.redirect('/signup');

        }
    }).catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
});

router.get("/locations/user", function (req, res) {
    res.render("locations")
})

router.get("/locations/saved", function (req, res){
    console.log("hi");
    db.locations.findAll({
        where:{
        userId: req.session.user.id
        }
    }).then(function(savedLoc){
        res.json(savedLoc)

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.post("/locations/user", function (req, res) {
    db.locations.create({
        name: req.body.name,
        review: req.body.review,
        address: req.body.address,
        image: req.body.image,
        long: req.body.long,
        lat: req.body.lat,
        userId: req.session.user.id

    }).then(function(){
        res.send("created")
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        res.json('logged out');
    });
});

router.get("/readsessions", function (req, res) {
    res.json(req.session);
    console.log(req.session.user);
});



router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        res.json('logged out');
    });
});

module.exports = router;