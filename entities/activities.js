const PG = require("pg");
const genericSql = require("./genericSql");

const tableName = "activities";

function findAll() {
  return genericSql.findAll(tableName);
}

function findById(id) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "select a.id, a.title, a.status, a.id_owner, "
    + " u.firstname firstname_owner, u.lastname lastname_owner, u.email email_owner"
    + " from activities a"
    + " inner join users u on u.id=a.id_owner"
    + " where a.id=$1::uuid",
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

function getActivitiesByOwner(user_id) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "select a.* from activities a where a.id_owner=$1::uuid",
    [user_id])
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

function getActivitiesByMember(user_id) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "select a.* from activities a inner join activity_members am on am.id_activity=a.id "
    + " where am.id_user=$1::uuid",
    [user_id])
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

module.exports = {
  findAll: findAll,
  findById: findById,
  getActivitiesByOwner: getActivitiesByOwner,
  getActivitiesByMember: getActivitiesByMember
}
