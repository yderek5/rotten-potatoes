module.exports = function(sequelize, DataTypes){
    var average_table = sequelize.define("average_table", {
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
        },
        gameId: {
            type: DataTypes.INTEGER,
        }, 
        gameName: {
            type: DataTypes.STRING,
        },
        average: {
            type: DataTypes.DECIMAL(4,2),
        }
    }, {
        timestamps:true,
    });

    return average_table;
};