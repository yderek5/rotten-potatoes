module.exports = function(sequelize, DataTypes){
    var user_table = sequelize.define("user_table", {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING,
        }, 
        usernamme: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps:false,
    });

    user_table.associate = function(models){
        user_table.hasMany(models.reviews_tables,{
            onDelete: "cascade"
        });
    }
    return user_table;
}