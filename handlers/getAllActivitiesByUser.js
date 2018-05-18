const activitiesService = require("../services/activitiesService");

function getAllActivitiesByUser(request, result) {
  activitiesService.getAllActivitiesByUser(request.user.id,"1")
  .then((activities) => {
    console.log("fefefe ", request.user);
    result.render("activitiesList",{"user": request.user, "activities": activities, "mode": "1"});
  });
}

module.exports = getAllActivitiesByUser;
