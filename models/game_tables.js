module.exports = function(sequelize, DataTypes){
    var game_tables = sequelize.define("game_tables", {
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

    game_tables.associate = function(models){
        game_tables.hasMany(models.reviews_tables, {
            onDelete: "cascade"
        });
    }

    return game_tables;
};