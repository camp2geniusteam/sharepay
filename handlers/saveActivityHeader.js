
const activitiesService = require("../services/activitiesService");

function saveActivityHeader(request, result) {
  if (request.body.activityId) {
    activitiesService.updateActivityHeader(request.body)
    .then(activityId => {
      result.redirect(`/activityHeader/${activityId}`);
    });
  } else {
    const currentUser = request.user; // TO COMPLETE WITH CONNEXION INFORMATION
    activitiesService.createActivityHeader(request.body, currentUser)
    .then(activityId => {
      result.redirect(`/expense/${activityId}`);
    });
  }
}

module.exports = saveActivityHeader;
