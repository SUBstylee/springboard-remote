const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.
/**
 * Helper function to make partial update queries.
 * Used to make the SET clause of an SQL UPDATE query.
 * Can be used to UPDATE single or multiple fields.
 * 
 * @param {*} dataToUpdate {Obj} {field1: newVal, field2: newVal, ...} 
 * @param {*} jsToSql {Obj} {}
 * @returns {Obj} {field1: "val", field2: "val", ...} maps data fields to database column names
 * @example {firstName: "Bob", age: 100}=>
 * {setCols: '"first_name"=$1,"age"=$2', values: ["Bob",100]}
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
    `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
