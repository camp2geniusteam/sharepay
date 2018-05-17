
const activitiesService = require("../services/activitiesService");

function saveActivityHeader(request, result) {
  if (request.body.activityId) {
    activitiesService.updateActivityHeader(request.body)
    .then(activityId => {
      result.redirect(`/activityHeader/${activityId}`);
    });
  } else {
    const currentUser = {"id": "4e0d0150-ee87-4878-a0c0-0f724a1fa4f1"}; // TO COMPLETE WITH CONNEXION INFORMATION
    activitiesService.createActivityHeader(request.body, currentUser)
    .then(activityId => {
      result.redirect(`/activityHeader/${activityId}`);
    });
  }
}

module.exports = saveActivityHeader;
