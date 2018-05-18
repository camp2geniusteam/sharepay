const activitiesService = require("../services/activitiesService");

function saveExpense(request, result) {
  console.log("request.body=",request.body)
  if (request.body.expenseId) {
    activitiesService.updateExpense(request.body)
    .then(expenseId => {
      result.redirect(`/expenses/${request.body.activityId}/${expenseId}`);
    });
  } else {
    const currentUser = request.user;
    activitiesService.createExpense(request.body, currentUser)
    .then(expenseId => {
      result.redirect(`/expenses/${request.body.activityId}/${expenseId}`);
    });
  }
}

module.exports = saveExpense;
