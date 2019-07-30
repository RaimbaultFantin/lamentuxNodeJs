var mongoose = require('mongoose');

// Schema Tweet
var tweetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ref to user for use the populate method
})

var Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet; 