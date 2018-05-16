
const activitiesService = require("../services/activitiesService");

function getActivity(request, result) {
  activitiesService.getActivityWithDetail(request.params.id)
  .then((rows) => {
    // result.json(rows);
    result.render("activityDetails",{"activity": rows});
  });
}

module.exports = getActivity;
