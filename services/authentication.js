// const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const userAuth = require("../entities/userAuth");
// const User = userModel.User;
const FB = require("fb");
// const bcrypt = require("bcrypt-nodejs");


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
    callback(null, user.email);
  });

  passport.deserializeUser(function (email, callback) {
    return userAuth.findUserByEmail(email).then(user => {
      callback(null, user);
    });

    // userAuth.findUserByFacebookId(id, function (err, user) {
    //   callback(err, user);
    // });
  });

  // passport.use(new FacebookStrategy({
  //   clientID: process.env.FACEBOOK_APP_ID,
  //   clientSecret: process.env.FACEBOOK_APP_SECRET,
  //   callbackURL: process.env.FACEBOOK_APP_URL_CALLBACK,
  //   profileFields: ["email"]
  // }, function (token, refreshToken, profile, callback){
  //   console.log("profile: ", profile);
  //   process.nextTick(function () {
  //     new userAuth.Facebook({facebook_id: profile.id})
  //       .fetch()
  //       .then(fbUser => {
  //         if(fbUser){
  //           console.log("fbUser: ",fbUser);
  //           return callback(null, fbUser);
  //         }else{
  //           // new userAuth.User().save().then(user => {
  //           //   let newUserId = user.toJSON().id;
  //           userAuth.createNewUser(function(newUserId){
  //             let newFBUser = {
  //               id: newUserId,
  //               token: token,
  //               facebook_id: profile.id,
  //               email: profile.emails[0].value,
  //               name: profile.name.givenName + " " + profile.name.familyName
  //             };
  //
  //             console.log("newFBUser: ",newFBUser);
  //             new userAuth.Facebook(newFBUser)
  //               .save({}, { method: 'insert' })
  //               .then(facebook => {
  //                 return callback(null, newFBUser);
  //               });
  //           });
  //         }
  //       })
  //   });
  // }));


  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_APP_URL_CALLBACK
      },
      function(accessToken, refreshToken, profile, callback) {
        FB.api(
          "me",
          { fields: "id,first_name,last_name,email", access_token: accessToken },
          function(userFacebook) {
            console.log("userFacebook", userFacebook);
            userAuth.findUserByEmail(userFacebook.email).then(user => {
              console.log("user", user);
              if(user){
                return user;
              }else {
                return userAuth.addUser(userFacebook);
              }
            }).then(user => {
              callback(null,user);
            }).catch(error => {
              callback(error);
            })

            //
            // if(userAuth.findUserByEmail(user.email) ===  null){
            //   console.log("here");
            //   userAuth.addUser(user).then(user => {
            //     callback(null, user);
            //   }).catch(error => {
            //     callback(null, user);
            //   })
            // }else{
            //   userAuth.findUserByEmail(user).then(user => {
            //     callback(null, user);
            //   }).catch(error => {
            //     callback(null, user);
            //   })
            // }
          }
        );
      }
    )
  );
}




