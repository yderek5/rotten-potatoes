module.exports = function(sequelize, DataTypes){
    var Game_table = sequelize.define("game_tables", {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        }, 
        description: {
            type: DataTypes.TEXT
        }, 
        image_thumbnail: {
          type: DataTypes.TEXT
        }, 
        external_id: {
          type: DataTypes.STRING,
          allowNull: true,
        }, 
    }, {
        timestamps:false,
    });
    return Game_table;
};