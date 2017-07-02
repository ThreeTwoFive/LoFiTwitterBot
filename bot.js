var Twit = require('twit');
//var configKeys = require('./config.js');

var Bot = new TwitterBot({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});

//12 links
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
//test post
bot.post('statuses/update', 
    {status: 'New Hour New Vibes '
        + links[Math.floor(Math.random() * links.length)]
    }, 
    function(err, data, response){

    console.log(data);
})

//test post status on mention
bot.get('statuses/mentions_timeline', function(err, data, response){
    console.log(data);
})

//test post at certain time (Daily post feature)


//Need function to scrape new song to post or grab from resource file


//Retweet tweets with hashtag #lofi #lofihiphop etc

