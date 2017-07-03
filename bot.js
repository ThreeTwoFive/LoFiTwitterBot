var Twit = require('twit');
var configKeys = require('./config.js');

function postDailySongTweet(){
    var bot = new Twit(configKeys);
    
    var links = ['https://www.youtube.com/watch?v=6mtn1YWyJas',
                'https://www.youtube.com/watch?v=DhHGDOgjie4',
                'https://www.youtube.com/watch?v=7D4kEdnShrs',
                'https://www.youtube.com/watch?v=dIC4VSUE7q4',
                'https://www.youtube.com/watch?v=HbGoW-L_zwk',
                'https://www.youtube.com/watch?v=fOy1esPEc08',
                'https://www.youtube.com/watch?v=UvO6PuPFpYc',
                'https://www.youtube.com/watch?v=nLEOwgm7OUQ',
                'https://www.youtube.com/watch?v=TGLQ5C8JYZw',
                'https://www.youtube.com/watch?v=jo4-FhqkNwQ',
                'https://www.youtube.com/watch?v=fgGFNZWEIcU',
                'https://www.youtube.com/watch?v=HYLxs7Gonac'];
    
    getDailySongs();

    bot.post('statuses/update', 
        {status: 'New Hour New Vibes '
            + links[Math.floor(Math.random() * links.length)]
        }, 
        function(err, data, response){

        console.log(data);
    })

}

function getDailySongs(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'url');
    xhr.send();

    console.log(JSON.parse(xhr.responseText));
}


/*
    Move other functions to another file
    They need to be run at different intervals or constantly
*/

//test post status on mention
/*
bot.get('statuses/mentions_timeline', function(err, data, response){
    console.log(data);
})
*/
//test post at certain time (Daily post feature)

//Need function to scrape new song to post or grab from resource file

//Retweet tweets with hashtag #lofi #lofihiphop etc

