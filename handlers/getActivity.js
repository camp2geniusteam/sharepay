
const activitiesService = require("../services/activitiesService");

function getActivity(request, result) {
  activitiesService.getActivityWithDetail(request.params.id)
  .then((activity) => {
    //group expense amount by payer
    const amountByPayer = [];
    activity.expenses.forEach(expense => {
      const index = amountByPayer.findIndex(element => {return (element.payer.id === expense.payer.id)});
      if (index >= 0) {
        amountByPayer[index].totalAmount += expense.amount;
      } else {
        amountByPayer.push({"payer": expense.payer, "totalAmount": expense.amount})
      }
    });

    result.render("activityDetails",{"user": request.user, "activity": activity, "amountByPayer": amountByPayer});
  });
}

module.exports = getActivity;
