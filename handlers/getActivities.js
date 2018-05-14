const activitiesService = require("../services/activitiesService");

function getActivities(request, result) {
  activitiesService.getAllActivities()
  .then((rows) => {
    result.json(rows);
  });
}

module.exports = getActivities;
