const PG = require("pg");

function findByEmail(email) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "select * from users u where u.email=$1::varchar",
    [email])
    .then((result) => result.rows)
    .then((data) => {
      console.log("user=", data);
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
