const activitiesService = require("../services/activitiesService");

function getAllActivitiesByUser(request, result) {
  activitiesService.getAllActivitiesByUser(request.params,"1")
  .then((rows) => {
    //result.json(rows);
    result.render("activitiesList",{"activities":rows});
  });
}

module.exports = getAllActivitiesByUser;
