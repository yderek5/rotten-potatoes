module.exports = function(sequelize, DataTypes){
    var Users_table = sequelize.define("user_tables", {
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
    return Users_table;
}