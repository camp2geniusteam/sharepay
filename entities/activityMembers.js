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

module.exports = {
  getMembersFromActivity: getMembersFromActivity
}
