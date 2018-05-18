const activitiesService = require("../services/activitiesService");

function getActivities(request, result) {
  activitiesService.getAllActivities()
  .then((rows) => {
    result.json(rows);
    result.render(rows);
  });
}

module.exports = getActivities;
