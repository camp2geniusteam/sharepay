const PG = require("pg");

function findByEmail(email) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "select u.id, u.firstname, u.lastname, u.email, u.password "
    + " from users u where u.email=$1::varchar",
    [email])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
	    return data[0];
    })
    .catch((error) => {
      console.warn(error);
      client.end();
    });
}

module.exports = {
  findByEmail: findByEmail
}
