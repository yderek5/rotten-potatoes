// Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize
var sequelize = new Sequelize("potato", "potato", "BootCamp", {
  host: "lynamdb.crwd97ixioxz.us-east-2.rds.amazonaws.com",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;