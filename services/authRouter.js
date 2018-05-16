const express = require("express");
const router = express.Router();
const passport = require("passport");

// Used to encrypt user password before adding it to db.
const bcrypt = require("bcrypt-nodejs");

// Bookshelf postgres db ORM object. Basically it makes it simple and less error port to insert/query the db.
const userModel = require("../entities/userModel");

router.get("/", function(req, res, next) {
  // If user is not authenticated, redirect them to the signin page.
  if (!req.isAuthenticated()) {
    res.redirect("/signin");
  } else {
    let user = req.user;
    console.log(user);

    res.render("login", {title: "Sharepay", user: user});
  }
});
//
// router.get("/signin", function(req, res, next) {
//   if (req.isAuthenticated()) {
//     res.redirect("/");
//   } else {
//     res.render("signin", { title: "Sign In" });
//   }
// });
//
// // Add user to database.
// router.post("/signin", function(req, res, next) {
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/signin"
//   }, function(err, user, info) {
//     if (err) {
//       return res.render("signin", { title: "Sign In", errorMessage: err.message });
//     }
//
//     if (!user) {
//       return res.render("signin", { title: "Sign In", errorMessage: info.message });
//     }
//
//     return req.logIn(user, function(err) {
//       if (err) {
//         return res.render("signin", { title: "Sign In", errorMessage: err.message });
//       } else {
//         return res.redirect("/");
//       }
//     });
//   })(req, res, next);
// });
//
// router.get("/signout", function(req, res, next) {
//   if (!req.isAuthenticated()) {
//     res.redirect("/", { errorMessage: "You are not logged in" });
//   } else {
//     req.logout();
//     res.redirect("/signin");
//   }
// });




router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));

router.get("/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/", //need to modify
    failureRedirect: "/"
  })
);

module.exports = router;