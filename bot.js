var Twit = require('twit');
var configKeys = require('./resources/config.js');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("YoutubeVideosDB");

function postDailySongTweet(){
    var bot = new Twit(configKeys);
    var data;

    getRandomVideo(function(data){
        var vidUrl = 'https://www.youtube.com/watch?v=' + data.url;
        bot.post('statuses/update', 
            {status: 'New Day New Vibes ' + vidUrl}, 
            function(err, data, response){
                console.log("Finished posting tweet");
            }
        )
    })
}

//All sqlite3 calls are async
function getRandomVideo(callback){
    db.each("SELECT TITLE as title, URL as url FROM YOUTUBEVIDEO ORDER By RANDOM() LIMIT 1", function(err, row){
        var data =  {
            title: row.title, 
            url:row.url
        };
        callback(data);
    });
}

postDailySongTweet();

//use twitter streaming API to bypass rate limit (mentions, tags)
//Retweet tweets with specific hashtag #lofi #lofihiphop etc

/*
bot.get('statuses/mentions_timeline', function(err, data, response){
    console.log(data);
})
*/

