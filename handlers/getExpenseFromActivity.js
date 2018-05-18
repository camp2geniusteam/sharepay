
const activitiesService = require("../services/activitiesService");

function getExpenseFromActivity(request, result) {
  activitiesService.getAllExpensesFromActivity(request.params.activityId)
  .then((expenses) => {
    console.log("expenses=", expenses);
    const expenseFound = expenses.expenses.find(expense => {
      return (expense.id === request.params.expenseId)
    });
    console.log("expenseFound=", expenseFound);
    // result.json(rows);
    result.render("ExpenseFromActivity",{"user": request.user, "activityId": request.params.activityId, "expense": expenseFound});
  });
}

module.exports = getExpenseFromActivity;
