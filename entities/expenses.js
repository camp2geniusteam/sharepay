const genericSql = require("./genericSql");

const tableName = "expenses"

function findAll() {
  return genericSql.findAll(tableName);
}

function findById(id) {
  return genericSql.findById(tableName, id);
}

module.exports = {
  findAll: findAll,
  findById: findById
}
