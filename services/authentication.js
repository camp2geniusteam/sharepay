// const LocalStrategy = require("passport-local").Strategy;
const facebookStrategy = require("passport-facebook").Strategy;
const userModel = require("../entities/userModel");
const User = userModel.User;
const bcrypt = require("bcrypt-nodejs");


// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback" //need to modify after deployment
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({facebookId: profile.id}, function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));

module.exports = function (passport) {
  passport.serializeUser(function (user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function (id, callback) {
    userModel.grabUserCredentials(id, function (error, user) {
      callback(error, user);
    })
  });

  // passport.use(new FacebookStrategy({
  //   clientID: process.env.FACEBOOK_APP_ID,
  //   clientSecret: process.env.FACEBOOK_APP_SECRET,
  //   callbackURL: "http://localhost:3000/auth/facebook/callback" //need to modify after deployment
  // },
  //   function (token, refreshToken, profile, callback) {
  //   process.nextTick(function () {
  //     new userModel.Facebook({fackbook_id: profile.id})
  //       .fetch()
  //       .then(function (fbUser) {
  //         if (fbUser){
  //           return callback(null, fbUser)
  //         }else {
  //           new User().save().then(function (value) {
  //             let newUserId = user.toJSON().id;
  //             let newFBUser = {
  //               id: newUserId,
  //               token: token,
  //               fackbook_id: profile.id,
  //               email: profile.emails[0].value,
  //               name: profile.name.givenName + ' ' + profile.name.familyName
  //             };
  //             //Create new Facebook user with token
  //             new userModel.Facebook(newFBUser)
  //               .save({}, {method: "insert"})
  //               .then(function (facebook) {
  //                 return callback(null, newFBUser);
  //               });
  //           });
  //         }
  //       })
  //   });
  // }));
}

