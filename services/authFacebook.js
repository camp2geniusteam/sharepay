const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/facebook", passport.authenticate("facebook", {
  authType: "rerequest",
  scope: ["email"]
}));

router.get("/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/activities", //need to modify
    failureRedirect: "/"
  }),
  function(request, result) {
    result.redirect("/activities");
  }
);

module.exports = router;