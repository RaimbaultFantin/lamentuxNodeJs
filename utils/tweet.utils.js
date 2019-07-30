const Tweet = require('../models/Tweet');

module.exports = {
    getTweetByUserId: function(userid){
        Tweet.find({userId:userid}).populate('User').then(function(tweets){
            
            if(tweets.length>0){
                return tweets;
            }else{
                return null;
            }
        },function (err) { // if error in the request (Tweet.find)
            console.log(err);
        })
    }
}