const db = require("../models");

const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");


router.get("/", function (req, res) {
    res.redirect("signup");
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
            id: newUser.id
        };
        res.redirect("locations/user");


    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get("/login", function (req, res) {
    res.render("index");
});

router.post("/login", function (req, res) {
    console.log(req.body);
    db.user.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUser => {
        if (bcrypt.compareSync(req.body.password, dbUser.password)) {
            req.session.user = {
                username: dbUser.username,
                id: dbUser.id
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
    res.render("locations");
});

router.post("/locations/user", function (req, res) {
    db.locations.create({
        name: req.body.name,
        review: req.body.review,
        address: req.body.address,
        image: req.body.image

    }).then(newLocation => {
        // res.json(newLocation)
        res.redirect("/locations/user");
        console.log("image:", newLocation.image);


        console.log("New Location:", newLocation.image);
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


// router.get("/readsessions", function (req, res) {
//     res.json(req.session);
// });
router.get("/readsessions", function (req, res) {
    res.json(req.session);
});

router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        res.json('logged out');
    });
});



module.exports = router;