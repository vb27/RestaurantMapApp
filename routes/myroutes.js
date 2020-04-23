const db = require("../models");

const express = require("express");

const router = express.Router();

const bcrypt = require("bcrypt");


router.get("/", function (req, res) {
    res.render("index");
});


router.get("/signup", function (req, res) {
    res.render("index");
});

router.get("/login", function (req, res) {
    res.render("index");
});


router.get("/locations", function (req, res) {
    res.render("locations");
});



router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        res.json('logged out');
    });
});



router.post("/locations", function (req, res) {
    console.log("reg.body:", req.body);
    db.locations.create({
        name: req.body.name,
        review: req.body.review,
        image: req.body.image,
        address: req.body.address,




    }).then(newLocation => {
        // res.json(newLocation)
        res.redirect();
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
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
        // res.send("logged in!")

    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
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
            res.redirect('/locations');
        } else {
            res.send("not logged in");
            res.redirect('/signup');
        }
    });
});

// router.get("/readsessions", function (req, res) {
//     res.json(req.session);
// });



router.post("/api/newuser", function (req, res) {
    db.User.create({
        userName: req.body.userName,
        userPassword: req.body.userPass
    }).then(function () {
        res.redirect("/");
    });
});


router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", function (req, res) {
    db.User.findOne({
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
            res.redirect('/secretclub')
        } else {
            res.send("not logged in")
        }
    });
});

router.get("/readsessions", function (req, res) {
    res.json(req.session);
});

router.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
        res.json('logged out');
    });
});



module.exports = router;