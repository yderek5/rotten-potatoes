// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

var Users_table = sequelize.define("user_table", {
  id: {
      type: Sequelize.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
  },
  first_name: {
      type: Sequelize.STRING
  },
  last_name: {
      type: Sequelize.STRING,
  }, 
  usernamme: {
      type: Sequelize.STRING
  },
  password: {
      type: Sequelize.STRING,
  }
}, {
  timestamps: false
});

// Syncs with DB
Users_table.sync();

module.exports = Users_table;
