module.exports = function(sequelize, DataTypes){
    var user_table = sequelize.define("user_table", {
        username: {
            type:DataTypes.STRING,
        }, 
        email: {
            type:DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        password: {
            type:DataTypes.STRING, 
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