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

function insertActivity(activity) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "insert into activities (title, id_owner, status) values "
    + " ($1::varchar, $2::uuid, $3::varchar)"
    + " returning (id)",
    [activity.title, activity.id_owner, activity.status])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
      console.log("data[0]=", data[0]);
	    return data[0].id;
    })
    .catch((error) => {
      console.warn(error);
      client.end();
    });
}

function updateTitle(activityId, activityTitle) {
  //console.log("updateTitle=", activityId, activityTitle);
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "update activities set title=$1::varchar where id=$2::uuid returning (id)",
    [activityTitle, activityId])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
      //console.log("data=", data);
	    return data[0].id;
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
  getActivitiesByMember: getActivitiesByMember,
  insertActivity: insertActivity,
  updateTitle: updateTitle
}
