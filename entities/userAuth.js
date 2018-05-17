// const knex = require("knex")({
//   client: "postgres",
//   // connection: process.env.DATABASE_URL
//   connection: {
//     host    : "localhost",
//     port    : "5436",
//     user    : "postgres",
//     password: "postgres",
//     database: "oauth_test",
//     charset : "utf8"
//   }
// });
//
// const db = require("bookshelf")(knex);
//
// const User = db.Model.extend({
//   tableName: "users",
//   idAttribute: "id",
//   Facebook: function() {
//     return this.hasOne(Facebook, "id");
//   }
// });
//
//
// const Facebook = db.Model.extend({
//   tableName: "facebook",
//   idAttribute: "id",
//   User: function() {
//     return this.belongsTo(User, "id");
//   }
// });
//
//
// // ------------------------------
// // createNewUser
// // ------------------------------
// // Makes a new user in the database with
// // automatic incremented ID. Then, returns
// // that user"s ID after the user is created.
// function createNewUser(callback) {
//   new User().save().then(function (user) {
//     callback(user.toJSON().id);
//   });
// }
//
//
//
// // ------------------------------
// // grabUserCredentials
// // ------------------------------
// // Returns a JSON list of a single user like this:
// // {
// //     facebook: {
// //       id: userId,
// //       token: null,
// //       email: null,
// //       name: null
// //     }
// // }
//
// function grabUserCredentials(userId, callback) {
//   console.log("connect to db");
//   let loginUser = {
//     facebook: {
//       id: null,
//       token: null,
//       // facebook_id: null,
//       email: null,
//       name: null,
//     }
//   };
//
//   knex.select("users.id",  "users.email", "users.password",
//               "facebook.token as fb_token", "facebook.email as fb_email", "facebook.name as fb_name")
//     .from("users")
//     .leftOuterJoin("facebook","facebook.email","=","users.email")
//     .where("users.id", userId)
//     .then(function(row){
//       row = row[0];
//       if (!row){
//         callback("Could not find user with email", null);
//       }else{
//         loginUser.facebook.token = row.fb_token;
//         loginUser.facebook.email = row.fb_email;
//         loginUser.facebook.name = row.fb_name;
//         callback(null, loginUser);
//       }
//     })
// }
//
//
//
// module.exports = {
//   User: User,
//   Facebook: Facebook,
//   createNewUser: createNewUser,
//   grabUserCredentials: grabUserCredentials
// };







const PG = require("pg");
const client = new PG.Client({
  connectionString: process.env.DATABASE_URL
});
client.connect();


function findUserById(id) {
  return client.query(
    "select * from users u where u.id = $1::uuid",
    [id])
    .then(result => result.rows)
    .then(data => {
      return data[0];
    })
    .catch(error => {
      client.end();
      console.log(error);
    });
}


function findUserByFacebookId(id) {
  return client.query(
    "select * from users u where u.facebook_id = $1::varchar",
    [id.toString()])
    .then(result => result.rows)
    .then(data => {
      return data[0];
    })
    .catch(error => {
        client.end();
      console.log(error);
    });
}

function findUserByEmail(email){
  return client.query(
    "select * from users u where u.email = $1::varchar",
    [email])
    .then(result => result.rows)
    .then(data => {
      console.log("data: ", data[0]);
      return data[0];
    })
    .catch(error => {
      client.end();
      console.log(error);
    });
}



function addUser(user){
  return client.query(
    "insert into users(id, email, firstname, lastname, facebook_id) values (gen_random_uuid(), $1::varchar, $2::varchar, $3::varchar, $4::varchar)",
    [user.email, user.first_name, user.last_name, user.id.toString()])
    .then(result => result.rows)
    .then(data => {
      return data[0];
    })
    .catch(error => {
      client.end();
      console.log(error);
    });
}

module.exports = {
  findUserById: findUserById,
  findUserByFacebookId: findUserByFacebookId,
  findUserByEmail: findUserByEmail,
  addUser: addUser
  // getUserByEmail: getUserByEmail
}