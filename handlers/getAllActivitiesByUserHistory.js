const activitiesService = require("../services/activitiesService");

function getAllActivitiesByUserHistory(request, result) {
  activitiesService.getAllActivitiesByUser(request.params.id,"0")
  .then((activities) => {
    result.render("activitiesList",{"user": request.user, "activities": activities, "mode": "0"});
  });
}

module.exports = getAllActivitiesByUserHistory;
