//https://www.googleapis.com/youtube/v3/search?key=AIzaSyA4Ej9RkpGYu5y4Fbu0aSVC9_JyLYddy-0
//&channelId=UCSJ4gkVC6NrvII8umztf0Ow
//&part=snippet,id
//&order=date&maxResults=50
//&nextPageToken=...

//next page token optional param (&nextpageToken=...) nextpagetoken null if no next page
//throw items.id (url) and items.snippet.title (title) into txt file
var http = require('http');
var https = require('https');
var configKeys = require('./resources/config.js');
var youtubeIds = require('./resources/youtubeIds.js')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("YoutubeVideosDB");

function crawlYoutubeChannels(){
    db.all("Select Name as name, Id as id From YoutubeId", function(err, row){
        row.forEach(function(row){
            console.log(row.name + " : " +  row.id);
            var getURL = 'https://www.googleapis.com/youtube/v3/search'
                + '?key=' + configKeys.youtube_api_key
                + '&channelId=' + row.id
                + '&part=snippet,id'
                + '&maxResults=50';

            https.get(getURL, function(res){
                var body = '';
                res.on('data', function(data){
                    body += data;
                });

                res.on('end', function(){
                    //console.log(JSON.parse(body));
                    var response = JSON.parse(body);
                    //TO DO PAGINATION RESULTS 'if response has nextPageToken' call API with &nextPageToken param
                    //parse vid id and title DONE
                    for(var item in response.items){
                        console.log(response.items[item].id.videoId);
                        console.log(response.items[item].snippet.title);
                    }

                });
            });
        });


    });

}

function createDb(){
    db = new sqlite3.Database("YoutubeVideosDB");
}

function createTable(){
    db.run("CREATE TABLE IF NOT EXISTS YoutubeVideos (URL TEXT, TITLE TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS YoutubeId (Name TEXT, Id TEXT)");
}

function insertYoutubeVideos(urlId, title){
    var fullUrl = 'https://www.youtube.com/watch?v=' + urlId;
    db.run("Insert Into YoutubeVideos Values (?, ?)", fullUrl, title);
}

function deleteTestDb(){
    db.run("Delete from YoutubeVideos");
    db.each("Select URL as url, TITLE as title From YoutubeVideos", function(err, row){
        console.log(row.title + " : " +  row.url);
    });
}

function insertYoutubeId(){
    db.run("Insert Into YoutubeId Values (?, ?)", "Chilled Cow", "UCSJ4gkVC6NrvII8umztf0Ow");
    db.run("Insert Into YoutubeId Values (?, ?)", "Anime Vibe", "UC9uLMAmdGQaeLPHAOqkYlrw");
    db.run("Insert Into YoutubeId Values (?, ?)", "ChillHop", "UCOxqgCwgOqC2lMqC5PYz_Dg");
}

crawlYoutubeChannels();

