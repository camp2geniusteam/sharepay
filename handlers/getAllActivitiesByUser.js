const activitiesService = require("../services/activitiesService");

function getAllActivitiesByUser(request, result) {
  activitiesService.getAllActivitiesByUser(request.params.id,"1")
  .then((activities) => {
    result.render("activitiesList",{"user": request.session.userTemp, "activities": activities, "mode": "1"});
  });
}

module.exports = getAllActivitiesByUser;
