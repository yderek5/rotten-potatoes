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
      type: Sequelize.STRING,
  }, 
  description: {
      type: Sequelize.TEXT
  }, 
  image_thumbnail: {
    type: Sequelize.TEXT
  }, 
  external_id: {
    type: Sequelize.STRING,
    allowNull: true,
  }, 
  
}, {
  timestamps: false
});

// Syncs with DB
Game_table.sync();

module.exports = Game_table;



// var gameObject = {
//   description:  game.deck,
//   image_thumbnail: game.image.thumb_url, //string
//   image: game.image.screen_url, //string
//   external_id: game.id,
//   guid: game.guid, 
//   name:  game.name, //string
//   original_release_date: game.original_release_date,
//   platforms: []
//   }