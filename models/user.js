module.exports = function(sequelize, DataTypes){
    var User = sequelize.define('user', {
        id : {
            autoIncrement:true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        firstname: {
            type:DataTypes.STRING,
            notEmpty : true
        }, 
        lastname: {
            type:DataTypes.STRING,
            notEmpty : true
        },
        username: {
            type:DataTypes.TEXT
        },
        email: {
            type:DataTypes.STRING,
            validate: {
                isEmail: true
            },
            allowNull: false,
        },
        password: {
            type:DataTypes.STRING, 
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM('active','inactive'),
            defaultValue: 'active'
        }
    }, {
        timestamps:false,
    });

    //ADD ASSOCIATION BACK IN LATER, SYNTAX TO FIX.  LMG 1/20
    User.associate = function(models){
        User.hasMany(models.reviews_tables,{
            onDelete: "cascade"
        });
    }


    return User;
}