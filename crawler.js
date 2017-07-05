//https://www.googleapis.com/youtube/v3/search?key=AIzaSyA4Ej9RkpGYu5y4Fbu0aSVC9_JyLYddy-0&channelId=UCSJ4gkVC6NrvII8umztf0Ow&part=snippet,id&order=date&maxResults=50

//next page token optional param (&nextpageToken=...) nextpagetoken null if no next page
//throw items.id (url) and items.snippet.title (title) into txt file

var configKeys = require('./resources/config.js');
var youtubeIds = require('./resources/youtubeIds.js')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("YoutubeVideosDB");

function crawlYoutubeChannels(){
    var postURL = 'https://www.googleapis.com/youtube/v3/search?';
    postURL += configKeys.youtube_api_key;


}

function createDb(){
    db = new sqlite3.Database("YoutubeVideosDB");
}

function createTable(){
    db.run("CREATE TABLE IF NOT EXISTS YoutubeVideos (URL TEXT, TITLE TEXT)");
}

function testDb(){
    db.run("Insert Into YoutubeVideos Values (?, ?)", "https://www.youtube.com/watch?v=fgGFNZWEIcU", "NtrlTase - Unfaithful");

    db.each("Select URL as url, TITLE as title From YoutubeVideos", function(err, row){
        console.log(row.title + " : " +  row.url);
    });

}

testDb();

