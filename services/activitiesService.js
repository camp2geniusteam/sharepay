const activities = require("../entities/activities");


function getActivityWithDetail(activityId) {
  return activities.findById(activityId);
  /*
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
  return activities.findAll();
}


module.exports = {
  getActivityWithDetail: getActivityWithDetail,
  getAllActivities: getAllActivities
}
