var request = require('request');
module.exports = {
    getGames: function(req,res){

        //console.log('inside route');
    
        var url = 'https://www.giantbomb.com/api/games/?api_key=2e5e0ace4e2ef2fc79d258dd9156d7fbda0656c7&format=json';
                url += '&field_list=deck,image,id,guid,name,original_release_date,platforms,original_game_rating';
                url += '&limit=10';
                url += '&filter=name:' + req.params.filter;
    
        var encoded_url = encodeURI(url);
    
        //console.log(encoded_url);
    
        request(encoded_url , {headers: { 'User-Agent': 'RottenPotatoes' }},function (error, response, body) {
            if(error){
                console.log('Error: ' + error);
                response.send('An error has occured, please try again');
            }
    
            var data = JSON.parse(body);
            var resultCount = data.results.length;
            var games = [];
            if(resultCount > 0){
    
                for(i=0;i<resultCount;i++){
                    var game = data.results[i];
    
                    var gameObject = {
                        description:  game.deck,
                        image_thumbnail: game.image.thumb_url, //string
                        image: game.image.screen_url, //string
                        external_id: game.id,
                        guid: game.guid, 
                        name:  game.name, //string
                        original_release_date: game.original_release_date,
                        platforms: []
                        }
    
                    for (y=0;y<game.platforms.length;y++){
                        gameObject.platforms.push(game.platforms[y].name);
                    }
    
                    games.push(gameObject);
                }
    
       
    
            }
            else {
                res.send('No results found, please try another search');
            }
            res.render('./home/search',{games:games});
        })
    
    
    
        //res.render('./home/results.hbs', {searchString: req.params.filter});
    }
}