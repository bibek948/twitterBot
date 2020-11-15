//before you start copying this code, make sure you have a node.js server up and running and that you have configured authorization
//then create a new file under node_modules ('whatever you want to name is') in my case it is bot.js

console.log('The bot is starting')

var Twit=require('twit');
var config= require('./config');   //I am not uploading config file because it has the access token and so on

//our object T
var T = new Twit(config);
  
//our fs
var fs=require('fs');
//search for tweet
//post stuff to twitter 
//  tweet 'hello world!'
//
//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//our parameters for the search
/*
var params={ 
    q: 'Micheal Jordan',
     count: 10
};

//function gotData which prints the data
function  gotData(err, data, response) {
    var tweets=data.statuses;
    for(var i=0; i<tweets.length; i++){
        console.log(tweets[i].text);
    }
  
  }

  //our get API call
T.get('search/tweets', params, gotData);

*/
//
//  tweet 'hello world!'
//

//set up the memes every 12 hrs 









//Tweet with Text and Image
//the following code is for setting up the interval between tweets

var day=1;
tweetIt();
function tweetIt(){
    if(day==6){   //this code is redundant, try to change this if you want to use this code
        var filename="../meme"+ day+".png"; 
    }
    else {
       var filename="../meme"+ day+".jpg"; //path to the memes based on day
    }
        console.log(filename);
        var params={
            encoding: 'base64'
        }

        var b64content=fs.readFileSync(filename, params);
        T.post('media/upload', {media_data:b64content}, uploaded);
    
    function uploaded(err, data, response){
        //tweeting 
        var id=data.media_id_string;
        day=day%8;
        if(day==1){
        var tweet={
            status:'Bibek was too busy with his schoolwork but he managed to squeeze in some time to create me-bibekBot. Throughout this week, I will be posting memes every day on behalf of Bibek' + " @TwitterU"+" #CodechellaMeme", 
            media_ids: [id]
        }
        day++;
    }
    else {
        var tweet={
            status: 'Day'+ day,//+ ' #CodechellaMeme', 
            media_ids: [id]
        }
        day++;
    }
    T.post('statuses/update', tweet, tweeted);


    }

    function tweeted(err, data, response){
        if(err){
            console.log("find the error");
            console.log(data);
        }
        else {
            console.log("It worked, check it in your twitter account");
        }
    }
}

//every 24 hrs it will post something based on the meme files
setInterval(tweetIt, 1000*60*60*24);

//tweetIt()



/*

*/
/*
// this code below is depreciated, you might want to use a different way for streaming data in twitter
//to make someone's life easier, I am adding a demo of how you can stream.
// the following code continously keeps track of the number of twitter users that follow bill gates in a particular day
//Setting up a user stream 
var stream=T.stream('statuses/filter', { track: '@BillGates' });
var i=0;
//strem takes place, when some one follows, 
//the printed function is just to show you that it works
stream.on('follow', printed);
function printed(){
    
    var s="bot tracking tweet numbers "+i++;
   // tweetIt(s);
    console.log(stream);
}


/*
