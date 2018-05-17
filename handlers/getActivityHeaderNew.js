const activitiesService = require("../services/activitiesService");

const users = require("../entities/users");

function getActivityHeaderNew(request, result) {
  users.findAll()
  .then(users => {
    result.render("activityHeader",{"activity": activitiesService.newActivity(), "usersNoMember": users});
  });
}

module.exports = getActivityHeaderNew;
