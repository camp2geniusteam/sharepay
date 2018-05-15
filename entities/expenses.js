const PG = require("pg");

function getAllExpensesFromActivity(activity_id) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "select e.id, e.title, e.id_activity, e.amount, e.status, e.id_payer,"
    + " p.firstname firstname_payer, p.lastname lastname_payer, p.email email_payer,"
    + " em.id id_expense_member, em.id_user id_member,"
    + " m.firstname firstname_member, m.lastname lastname_member, m.email email_member"
    + " from expenses e"
    + " inner join users p on p.id=e.id_payer"
    + " inner join expense_members em on em.id_expense=e.id"
    + " inner join users m on m.id=em.id_user"
    + " where e.id_activity=$1::uuid"
    + " order by e.id;",
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
  getAllExpensesFromActivity: getAllExpensesFromActivity
}
