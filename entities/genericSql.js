const PG = require("pg");

function findAll(tableName) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "SELECT * FROM " + tableName,
    [])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
      return data;
    })
    .catch((error) => {
      console.warn(error);
      client.end();
    });
}

function findById(tableName, id) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "SELECT * FROM " + tableName + " where id=$1::uuid",
    [id])
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
  findAll: findAll,
  findById: findById
}
