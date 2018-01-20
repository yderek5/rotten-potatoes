// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

var Reviews_table = sequelize.define("reviews_table", {
  id: {
      type: Sequelize.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
  },
  comment: {
      type: Sequelize.STRING
  }, 
  graphics_rating: {
      type: Sequelize.INTEGER, 
  }, 
  game_play_rating: {
      type: Sequelize.INTEGER,
  }, 
  replayability: {
      type: Sequelize.INTEGER,
  }, 
  soundtrack: {
      type: Sequelize.INTEGER
  }, 
  users_id: {
      type: Sequelize.INTEGER
  }, 
  games_id: {
      type: Sequelize.INTEGER
  }
}, {
  timestamps: true
});


// Syncs with DB
Reviews_table.sync();

module.exports = Reviews_table;
