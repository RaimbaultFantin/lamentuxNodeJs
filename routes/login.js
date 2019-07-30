// imports
const router = require('express').Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jwtutils = require('../utils/jwt.utils');
const User = require('../models/Utilisateur');
const bcrypt = require('bcrypt');

/* Routes */

// load login page
router.get('/', function (req, res) {
    res.render('login.ejs');
})

// send logs infos
router.post('/', urlencodedParser, function (req, res, next) {
    User.findOne({ email: req.body.email }).then(function (user) {
        // if user exist
        if (user) {
            // compare hashpassword
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result) {
                    res.cookie('token', jwtutils.generateUserToken(user), { maxAge: 90000000, httpOnly: true }); 

                    res.json(
                        {
                            message: "Logged in !"
                        }
                    )
                } else {
                    next(new Error("Invalid Password"));
                }
            })
        } else {
            next(new Error("User doesn't exist"));
        }
    }, function (err) { // if error in the request (User.find)
        console.log("error in the request !")
        res.status(500).send(err);
    })

})

module.exports = router;