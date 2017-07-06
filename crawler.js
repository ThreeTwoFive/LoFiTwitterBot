//https://www.googleapis.com/youtube/v3/search?key=AIzaSyA4Ej9RkpGYu5y4Fbu0aSVC9_JyLYddy-0
//&channelId=UCSJ4gkVC6NrvII8umztf0Ow
//&part=snippet,id
//&order=date&maxResults=50
//&nextPageToken=...

//https://www.googleapis.com/youtube/v3/search?key=AIzaSyA4Ej9RkpGYu5y4Fbu0aSVC9_JyLYddy-0&channelId=UCSJ4gkVC6NrvII8umztf0Ow&part=snippet,id&order=date&maxResults=50

//next page token optional param (&nextpageToken=...) nextpagetoken null if no next page

var http = require('http');
var https = require('https');
var configKeys = require('./resources/config.js');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("YoutubeVideosDB");

function crawlYoutubeChannels(){
    db.all("Select CHANNEL_NAME as name, CHANNEL_ID as id From YoutubeChannel", function(err, row){
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
                    var response = JSON.parse(body);
                    //TO DO PAGINATION RESULTS 'if response has nextPageToken' call API with &nextPageToken param
                    for(var item in response.items){
                        insertYoutubeVideo(response.items[item].id.videoId, 
                                            response.items[item].snippet.title,
                                            response.items[item].snippet.channelId);
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
    db.run("CREATE TABLE IF NOT EXISTS YoutubeChannel (ID INTEGER PRIMARY KEY, CHANNEL_NAME TEXT, CHANNEL_ID TEXT)");
    db.run('CREATE TABLE YoutubeVideo (ID INTEGER PRIMARY KEY, TITLE TEXT, URL TEXT, CHANNEL_ID TEXT, FOREIGN KEY (CHANNEL_ID) REFERENCES YoutubeChannel(CHANNEL_ID)');
}

function insertYoutubeVideo(urlId, title, channelId){
    var fullUrl = 'https://www.youtube.com/watch?v=' + urlId;
    db.run("Insert Into YoutubeVideo (TITLE, URL, CHANNEL_ID) Values (?, ?, ?)", title, urlId, channelId);
}

//Populate DB with youtube video information
//crawlYoutubeChannels();

