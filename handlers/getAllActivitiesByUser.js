const activitiesService = require("../services/activitiesService");

function getAllActivities(request, result) {
  activitiesService.getAllActivities()
  .then((rows) => {
    result.json(rows);
    result.render
  });
}

module.exports = getActivities;
