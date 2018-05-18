const express = require("express");
const router = express.Router();
// const passport = require("passport");

// Used to encrypt user password before adding it to db.
// const bcrypt = require("bcrypt-nodejs");

// Bookshelf postgres db ORM object. Basically it makes it simple and less error port to insert/query the db.
// const userModel = require("../entities/userModel");

router.get("/", function(req, res, next) {
  // If user is not authenticated, redirect them to the login page.
  if (!req.isAuthenticated()) {
    res.redirect("/login");
  } else {
    let user = req.user;
    console.log(user);

    res.render("activitiesList", {title: "Sharepay", user: user});
  }
});

router.get("/login", function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(req);
    res.redirect("/");
  } else {
    res.render("login", { title: "Sign In" });
  }
});

//Add user to database.
// router.post("/login", function(req, res, next) {
//   passport.authenticate("local", {
//     successRedirect: "/activitiesList",
//     failureRedirect: "/login"
//   }, function(err, user, info) {
//     if (err) {
//       return res.render("login");
//     }
//
//     if (!user) {
//       return res.render("login");
//     }
//
//     return req.logIn(user, function(err) {
//       if (err) {
//         return res.render("login");
//       } else {
//         return res.redirect("/");
//       }
//     });
//   })(req, res, next);
// });


router.get("/signout", function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("/", { errorMessage: "You are not logged in" });
  } else {
    req.logout();
    res.redirect("/login");
  }
});






module.exports = router;