// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

var Game_table = sequelize.define("game_table", {
  id: {
      type: Sequelize.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
  },
  name: {
      type: Sequelize.STRING
  }
}, {
  timestamps: false
});

// Syncs with DB
Game_table.sync();

module.exports = Game_table;
