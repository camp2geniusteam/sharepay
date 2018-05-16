const knex = require("knex")({
  client: "postgres",
  // connection: process.env.DATABASE_URL
  connection: {
    host    : '127.0.0.1',
    user    : 'postgres',
    password: 'postgres',
    database: 'oauth_test',
    charset : 'utf8',
  }
});

const db = require("bookshelf")(knex);

const User = db.Model.extend({
  tableName: "users",
  // idAttribute: "id",
  Facebook: function() {
    return this.hasOne(Facebook, "email");
  }
});


const Facebook = db.Model.extend({
  tableName: "facebook",
  // idAttribute: "id",
  User: function() {
    return this.belongsTo(User, "email");
  }
});

// ------------------------------
// createNewUser
// ------------------------------
// Makes a new user in the database with
// automatic incremented ID. Then, returns
// that user's ID after the user is created.
function createNewUser(callback) {
  new User().save().then(function (user) {
    callback(user.toJSON().id);
  });
}



// ------------------------------
// grabUserCredentials
// ------------------------------
// Returns a JSON list of a single user like this:
// {
//     facebook: {
//       id: userId,
//       token: null,
//       email: null,
//       name: null
//     }
// }

function grabUserCredentials(userId, callback) {
  let loginUser = {
    id: userId,
    token: null,
    email: null,
    name: null
  };

  knex.select("user.id",  "users.username", "users.password",
              "facebook.token as fb_token", "facebook.email as fb_email", "facebook.name as fb_name")
    .from("users")
    .leftOuterJoin("facebook")
    .where("users.id", "=", userId)
    .then(function(row){
      row = row[0];
      if (!row){
        callback("Could not find user with ID", null);
      }else{
        loginUser.facebook.token      = row.fb_token;
        loginUser.facebook.email      = row.fb_email;
        loginUser.facebook.name       = row.fb_name;
        callback(null, loginUser);
      }
    }
  )
}



module.exports = {
  User: User,
  Facebook: Facebook,
  createNewUser: createNewUser,
  grabUserCredentials: grabUserCredentials
};