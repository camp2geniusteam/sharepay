
const activitiesService = require("../services/activitiesService");

function getActivity(request, result) {
  activitiesService.getActivityWithDetail(request.params.id)
  .then((rows) => {
    // result.json(rows);
    result.render("activityDetails",{"activity": rows});
  });
}

module.exports = getActivity;



//
// const activitiesService = require("../services/activitiesService");
//
// function getActivity(request, result) {
//   activitiesService.getActivityWithDetail(request.params.id)
//   .then((activity) => {
//     // result.json(rows);
//
//     const expensesByPayer = [];
//     activity.expenses.forEach(expense => {
//       if(
//
//     });
//
//     result.render("activityDetails",{"activity": activity, "expensesByPayer" : expensesByPayer});
//   });
// }
//
// module.exports = getActivity;
