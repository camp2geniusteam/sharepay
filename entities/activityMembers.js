const PG = require("pg");

function getMembersFromActivity(activity_id) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "select am.id id_activity_member, "
    + " u.id id_user, u.firstname, u.lastname, u.email "
    + " from activity_members am "
    + " inner join users u on u.id=am.id_user "
    + " where am.id_activity=$1::uuid",
    [activity_id])
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

function insertActivityMember(id_activity, id_user) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "insert into activity_members (id_activity, id_user)"
      + " values ($1::uuid, $2::uuid)"
      + " returning (id)",
    [id_activity, id_user])
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

function deleteActivityMembersFromActivity(id_activity) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "delete from activity_members where id_activity=$1::uuid",
    [id_activity])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
	    return id_activity;
    })
    .catch((error) => {
      console.warn(error);
      client.end();
    });
}

module.exports = {
  getMembersFromActivity: getMembersFromActivity,
  insertActivityMember: insertActivityMember,
  deleteActivityMembersFromActivity: deleteActivityMembersFromActivity
}
