const users = require("../entities/users");

function loginTemp(request, result) {
  users.findByEmail(request.params.email)
  .then((user) => {
    request.session.userTemp = user;
    //console.log("request.session.userTemp=", request.session.userTemp);
    result.redirect(`/activitiesUser/${request.session.userTemp.id}`);
  });
}

module.exports = loginTemp;
