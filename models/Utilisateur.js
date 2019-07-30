var mongoose = require('mongoose');

// Declaration du model
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pseudo: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    followersId: [{ type: mongoose.Schema.Types.ObjectId, default: {} ,  minimize: false }]
})

// association du schema au model (premier param = model.js , deuxieme = schema)
var User = mongoose.model('User', userSchema);
module.exports = User;