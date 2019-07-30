// imports
const router = require('express').Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jwtutils = require('../utils/jwt.utils');
const mongoose = require('mongoose');
const User = require('../models/Utilisateur');
const Tweet = require('../models/Tweet');

/* Routes */

// load home page
router.get('/', function (req, res, next) {
    var userid = jwtutils.getUserId(req.headers.cookie);
    User.findOne({ _id: userid }).then(function (user) { 
        // if user exist
        if (user) {
            // get his tweets
            Tweet.find({ userId: userid }).populate('User').then(function (tweets) {
                // get followers suggestions
                User.find({}).limit(5).then(function (users) {
                    res.render('home.ejs', { tweets: tweets, user: user, users: users })
                })
            })
        } else {
            next(new Error("User doesn't exist"));
        }
    })

})

// send tweet
router.post('/', urlencodedParser, function (req, res, next) {
    var userid = jwtutils.getUserId(req.headers.cookie);
    User.findOne({ _id: userid }).then(function (user) {
        // if user exist
        if (user) {
            if (req.body.message.trim() != '') {
                // create tweet
                const tweet = new Tweet({
                    _id: new mongoose.Types.ObjectId(),
                    message: req.body.message,
                    userId: userid
                })
                tweet.save(); // save him
                res.json({
                    tweet_message: tweet.message,
                    tweet_date: tweet.date.toDateString(),
                    user: user
                })
            }
        } else {
            next(new Error("User doesn't exist"));
        }
    }, function (err) { // if error in the request (User.find)
        console.log("error in the request !")
        res.status(500).send(err);
    })

})

router.put('/add-follow/:id', function (req, res, next) {
    var userid = jwtutils.getUserId(req.headers.cookie);
    User.findOneAndUpdate(
        { _id: userid },
        { $push: { followersId: req.params.id } }, // push the id of the new follower
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
})
module.exports = router;