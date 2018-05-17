
const activitiesService = require("../services/activitiesService");

function getExpenseFromActivity(request, result) {
  activitiesService.getAllExpensesFromActivity(request.params.id)
  .then((rows) => {
    // result.json(rows);
    result.render("ExpenseFromActivity",{"expense": rows});
  });
}

module.exports = getExpenseFromActivity;
