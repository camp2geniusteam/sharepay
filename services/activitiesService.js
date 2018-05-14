const activities = require("../entities/activities");


function getActivityWithDetail(activityId) {
  return activities.findById(activityId);/*
  .then(activity => Promise.all([categories.getCategoryFromProduct(product.id), brands.findById(product.brand_id)])
	.then(values => {
	  product.categories = values[0];
	  product.brand = values[1][0];
	  return product;
	})
  )
  .then(product => completeDisplay([product])[0]);*/
}

function getAllActivities() {
  return activities.findAll()
  .then(activities => {
    return activities.map(activity => {
      activity.total_amount = 200;
      activity.members = [{firstname: "christophe", lastname: "Delattre"},
        {firstname: "damien", lastname: "Desprez"}];
        return activity;
      });
  });
}

function getAllActivitiesByUser(email, activityStatus) {
  return activities.findAll()
  .then(activities => {
    return activities.map(activity => {
      activity.total_amount = 200;
      activity.members = [{firstname: "christophe", lastname: "Delattre"},
        {firstname: "damien", lastname: "Desprez"}];
        return activity;
      });
  });
}


module.exports = {
  getActivityWithDetail: getActivityWithDetail,
  getAllActivities: getAllActivities,
  getAllActivitiesByUser: getAllActivitiesByUser
}
