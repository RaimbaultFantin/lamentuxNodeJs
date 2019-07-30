// imports
const router = require('express').Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false }); // bodyparser permet de recuperer les données d'un POST
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/Utilisateur');
const security = require('../utils/signup.utils')

/* Routes */

// load inscription page
router.get('/', function (res, res) {
    res.render('inscription.ejs');
})

// create new User
router.post('/', urlencodedParser, function (req, res, next) {
    if (security.validUser(req.body)) {
        User.findOne({ email: req.body.email })
            .then(function (user) {
                // if user not found
                if (!user) {
                    // hash password
                    bcrypt.hash(req.body.password, 10).then(function (hashPassword) {
                        // create user
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            pseudo: req.body.pseudo,
                            email: req.body.email,
                            password: hashPassword
                        })
                        user.save(); // save in database
                        
                        res.json(
                            {
                                message: "registration has been successfully completed!"
                            }
                        )
                    })
                } else {
                    next(new Error('User already exist'));
                }
            }, function (err) { // if error in the request (User.find)
                console.log("error in the request !")
                res.status(500).send(err);
            })
    } else { // if user isnt valid
        next(new Error('Invalid User'));
    }
})

module.exports = router;