const activitiesService = require("../services/activitiesService");

const users = require("../entities/users");

function getActivityHeader(request, result) {
  Promise.all([activitiesService.getActivityWithDetail(request.params.id), users.findAll()])
  .then(values => {
    const activity = values[0];
    const users = values[1];
    const usersNoMember = [];

    const activityMembers = activity.members.map(member => member.id);
    users.forEach(user => {
      if (!activityMembers.includes(user.id)) {
        usersNoMember.push(user);
      }
    })
    result.render("activityHeader",{"user": request.session.userTemp, "activity": activity, "usersNoMember": usersNoMember});
  });
}

module.exports = getActivityHeader;
