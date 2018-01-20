module.exports = function(sequelize, DataTypes){
    var Reviews_table = sequelize.define("reviews_tables", {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true
        },
        comment: {
            type: DataTypes.STRING
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
        users_id: {
            type: DataTypes.INTEGER
        }, 
        games_id: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
    });

    return Reviews_table;
}