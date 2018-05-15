const genericSql = require("./genericSql");

const tableName = "activity_members"

function findAll() {
  return genericSql.findAll(tableName);
}

function findById(id) {
  return genericSql.findById(tableName, id);
}

function getMembersFromActivity(activity_id) {
  //console.log("categories.getCategoryFromProduct begin");
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "select am.id activity_members_id, u.* from activity_members am inner join users u on u.id=am.id_user where am.id_activity=$1::uuid",
    [activity_id])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
	  //console.log("categories.getCategoryFromProduct end");
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
  getMembersFromActivity: getMembersFromActivity
}
