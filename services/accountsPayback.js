const { createTransaction, payback } = require('./payback');
const activitiesService = require("../services/activitiesService");


function getActivityForAccount(request, result) {
  activitiesService.getActivityWithDetail(request.params.id).then((rows) => {
    let listExpense = rows["expenses"];
    let listTransaction = [];
    let listExpenseMembers = [];
    let listAllMembers = [];
    let listPayback = [];
    let transactionExpense;

    listExpense.forEach((value,size) => {
      value.members.forEach((valueMembers, sizeMembers) => {
        listExpenseMembers.push(valueMembers.firstname);
        listAllMembers.push(valueMembers.firstname);
      });

      listAllMembers.push(value.payer.firstname);

      transactionExpense = createTransaction(value.payer.firstname, value.amount, listExpenseMembers);

      listTransaction.push(transactionExpense);
    });

    console.log(payback(listTransaction, arrayUnique(listAllMembers)));

    listPayback = payback(listTransaction, arrayUnique(listAllMembers));

    result.render("accounts",{"user": request.user, "activity": rows, "listPayback": listPayback});
  });
}


//Delete repeat data in array
const arrayUnique=function(arr){
  let result=[];
  let l=arr.length;

  for(let i=0;i<l;i++){
    let temp=arr.slice(i+1,l)
    if(temp.indexOf(arr[i])==-1){
      result.push(arr[i]);
    }else{
      continue;
    }
  }

  return result;
}

module.exports = {
  getActivityForAccount: getActivityForAccount
};