const activities = require("../entities/activities");
const activityMembers = require("../entities/activityMembers");
const users = require("../entities/users");
const expenses = require("../entities/expenses");


function getActivityWithDetail(activityId) {
  //console.log("getActivityWithDetail(activityId)=", activityId);
  return Promise.all([getHeaderFromActivity(activityId),
      getAllMembersFromActivity(activityId),
      getAllExpensesFromActivity(activityId)])
	.then(values => {
    const activity = values[0];
    activity.members = values[1];
    activity.totalAmount = values[2].totalAmount;
    activity.expenses = values[2].expenses;
    //console.log("activity with detail=", activity);
	  return activity;
	});
}

function getActivityWithDetailList(activityIdList) {
  //console.log("activityIdList=", activityIdList);
  if (activityIdList.length === 0) {
    return [];
  }
  if (activityIdList.length>1) {
    const activityIdCurrent = activityIdList.pop();
    //console.log("activityIdCurrent=", activityIdCurrent);
    return getActivityWithDetailList(activityIdList)
    .then(activities => {
       //console.log("activities=", activities);
       return getActivityWithDetail(activityIdCurrent)
       .then(activity => {
          activities.push(activity);
          return activities;
       })
     })
  } else {
    const activityIdCurrent = activityIdList[0];
    //console.log("activityIdCurrent=", activityIdCurrent);
    return getActivityWithDetail(activityIdCurrent)
    .then(activity => {
      const res = [activity];
      //console.log("res=", res);
      return res;
    });
  }
}

function getAllActivities() {
  return activities.findAll();
}

function getHeaderFromActivity(activityId) {
  return activities.findById(activityId)
  .then(activityEntity => {
    const activity = {};
    activity.id = activityEntity.id;
    activity.title = activityEntity.title;
    activity.status = activityEntity.status;
    const owner = {};
    owner.id = activityEntity.id_owner;
    owner.firstname = activityEntity.firstname_owner;
    owner.lastname = activityEntity.lastname_owner;
    owner.email = activityEntity.email_owner;
    activity.owner = owner;
    return activity;
  })
}

function getAllMembersFromActivity(activityId) {
  return activityMembers.getMembersFromActivity(activityId)
  .then(memberEntities => {
    const members = [];
    memberEntities.forEach(entity => {
      const member = {};
      member.id = entity.id_user;
      member.firstname = entity.firstname;
      member.lastname = entity.lastname;
      member.email = entity.email;
      member.idActivityMember = entity.id_activity_member;
      members.push(member);
    });
    return members;
  })

}

function getAllExpensesFromActivity(activityId) {
  return expenses.getAllExpensesFromActivity(activityId)
  .then(expensesOrdered => {
    let begin = true;
    const expenses = [];
    const currentExpense = {};
    let lastExpenseId = "";
    let totalAmount = 0;

    expensesOrdered.forEach(currentLine => {
      if (currentLine.id !== lastExpenseId) {
        lastExpenseId = currentLine.id;
        const currentExpense = {};
        expenses.push(currentExpense);
        currentExpense.id = currentLine.id;
        currentExpense.title = currentLine.title;
        currentExpense.amount = currentLine.amount;
        currentExpense.status = currentLine.status;
        const payer = {};
        payer.id = currentLine.id_payer;
        payer.firstname = currentLine.firstname_payer;
        payer.lastname = currentLine.lastname_payer;
        payer.email = currentLine.email_payer;
        currentExpense.payer = payer;
        currentExpense.members = [];
        totalAmount += currentLine.amount;
      }
      const member = {};
      member.id=currentLine.id_member;
      member.firstname=currentLine.firstname_member;
      member.lastname=currentLine.lastname_member;
      member.email=currentLine.email_member;
      member.idExpenseMember=currentLine.id_expense_member;
      expenses[expenses.length-1].members.push(member);
    });
    //console.log("expenses=", expenses);
    return {"expenses": expenses, "totalAmount": totalAmount};
  });
}

function getAllActivitiesByUserV2(userId, activityStatus) {
   console.log("getAllActivitiesByUserV2", userId, ", activityStatus=", activityStatus);
   return Promise.all([activities.getActivitiesByOwner(userId), activities.getActivitiesByMember(userId)])
	.then(values => {
    let activitiesFound = [];
    activitiesFound = activitiesFound.concat(values[0]);
    activitiesFound = activitiesFound.concat(values[1]);
    //console.log("activitiesFound=", activitiesFound);
    const activitiesIdFound = [];
    activitiesFound.forEach(activity => {
      if (activity.status === activityStatus && !activitiesIdFound.includes(activity.id)) {
        activitiesIdFound.push(activity.id);
      }
    });
    return activitiesIdFound;
	})
  .then(activitiesIdFound => {
    //console.log("activitiesIdFound=", activitiesIdFound);
    return getActivityWithDetailList(activitiesIdFound);
  })
  .then(values => {
    const activitiesWithDetail = [];
    values.forEach(value => activitiesWithDetail.push(value));
    //console.log("activitiesWithDetail=", activitiesWithDetail);
    return activitiesWithDetail;
  })
}

function getAllActivitiesByUser(userId, activityStatus) {
   console.log("getAllActivitiesByUser", userId);
   activities.getActivitiesByOwner(userId).then(res => console.log("fefefefe", res));
   return Promise.all([activities.getActivitiesByOwner(userId), activities.getActivitiesByMember(userId)])
	.then(values => {
    const activitiesIdFound = [];
    values[0].concat(values[1]).forEach(activity => {
      if (activity.status === activityStatus && !activitiesIdFound.includes(activity.id)) {
        activitiesIdFound.push(activity.id);
      }
    });
	  console.log("activitiesIdFound=", activitiesIdFound);
    return activitiesIdFound;
	})
  .then(activitiesIdFound => {
    const promiseToDo = [];
    activitiesIdFound.forEach(activityId => {
      promiseToDo.push(getActivityWithDetail(activityId));
    })
    return Promise.all(promiseToDo)
  })
  .then(values => {
    const activitiesWithDetail = [];
    values.forEach(value => activitiesWithDetail.push(value));
    //console.log("activitiesWithDetail=", activitiesWithDetail);
    return activitiesWithDetail;
  })
}

function updateActivityHeader(activityHeader) {
  console.log("updateActivityHeader=", activityHeader);
  return activities.findById(activityHeader.activityId)
  .then(activity => {
    console.log("activity.title=", activity.title, "activityHeader.activityTitle=", activityHeader.activityTitle);
    if (activity.title !== activityHeader.activityTitle) {
      return activities.updateTitle(activityHeader.activityId, activityHeader.activityTitle);
    } else {
      return activityHeader.activityId;
    }
  })
  .then(activityId => activityMembers.deleteActivityMembersFromActivity(activityId))
  .then(activityId => {
    const promiseToDo = [];
    if (activityHeader.activityMembersId.constructor === Array) {
      activityHeader.activityMembersId.forEach(memberId => {
        promiseToDo.push(activityMembers.insertActivityMember(activityId, memberId));
      });
    } else {
      promiseToDo.push(activityMembers.insertActivityMember(activityId, activityHeader.activityMembersId));
    }
    return Promise.all(promiseToDo);
  })
  .then(res => activityHeader.activityId);
}

function createActivityHeader(activityHeader, currentUser) {
  //console.log("createActivityHeader=", activityHeader);
  activityEntity = {};
  activityEntity.title = activityHeader.activityTitle;
  activityEntity.id_owner = currentUser.id;
  activityEntity.status = "1";
  activityIdInsert = "";

  return activities.insertActivity(activityEntity)
  .then(activityId => {
    activityIdInsert = activityId;

    const promiseToDo = [];
    if (activityHeader.activityMembersId.constructor === Array) {
      activityHeader.activityMembersId.forEach(memberId => {
        promiseToDo.push(activityMembers.insertActivityMember(activityId, memberId));
      });
    } else {
      promiseToDo.push(activityMembers.insertActivityMember(activityId, activityHeader.activityMembersId));
    }
    return Promise.all(promiseToDo);
  })
  .then(res => activityIdInsert);
}

function newActivity(owner) {
  activity = {};
  activity.title = "";
  activity.members = [];
  activity.expenses = [];
  activity.totalAmount = 0;
}

function createExpense(expense, currentUser) {
  expenseEntity = {};
  expenseEntity.title = expense.expenseTitle;
  expenseEntity.id_activity = expense.activityId;
  expenseEntity.id_payer = currentUser.id;
  expenseEntity.amount = expense.expenseAmount;
  expenseEntity.status = "1";
  expenseIdInsert = "";

  return expenses.insertExpense(expenseEntity)
  .then(expenseId => {
    expenseIdInsert = expenseId;

/*
    const PromiseToDo = [];
    if (expense.expenseMembersId.constructor === Array) {
      expense.expenseMembersId.forEach(memberId => {
        promiseToDo.push(expenseMembers.insertExpenseMember(expenseId, memberId));

      });
    } else {
      promiseToDo.push(expenseMembers.insertExpenseMember(expenseId,
      expense.expenseMembersId));
    }
    return Promise.all(promiseToDo);
    */
    return expenseIdInsert;
  })
  .then(res => expenseIdInsert);
}

module.exports = {
  getActivityWithDetail: getActivityWithDetail,
  getAllActivities: getAllActivities,
  getAllActivitiesByUser: getAllActivitiesByUserV2,
  createActivityHeader: createActivityHeader,
  updateActivityHeader: updateActivityHeader,
  newActivity: newActivity,
  getAllExpensesFromActivity: getAllExpensesFromActivity,
  createExpense: createExpense
}
