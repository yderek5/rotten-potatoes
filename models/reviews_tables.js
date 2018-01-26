module.exports = function(sequelize, DataTypes){
    var reviews_tables= sequelize.define("reviews_tables", {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        comment: {
            type: DataTypes.TEXT,
        }, 
        graphics_rating: {
            type: DataTypes.INTEGER, 
        }, 
        game_play_rating: {
            type: DataTypes.INTEGER,
        }, 
        replayability: {
            type: DataTypes.INTEGER,
        }, 
        soundtrack: {
            type: DataTypes.INTEGER
        }, 
        average: {
            type:DataTypes.INTEGER
        }
    }, {
        timestamps: false,
    });

    reviews_tables.associate = function(models){
        reviews_tables.belongsTo(models.game_tables, {
            // as: 'gamesID',
            foreignKey: {
                allowNull: false
              }
        });
        reviews_tables.belongsTo(models.user, {
            // as: 'usersID',
            foreignKey: {
                allowNull: false
              }
        });
    };

    
    return reviews_tables
}