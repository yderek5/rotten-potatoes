module.exports = function(sequelize, DataTypes){
    var average_table = sequelize.define("average_table", {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        }, 
        aveage: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps:true,
    });

    return average_table;
};