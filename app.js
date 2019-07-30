// imports
const express = require('express');
const mongoose = require('mongoose'); // ORM pour BDD noSQL
const cookieParser = require('cookie-parser')
// mongoose configs
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/twittux', { useNewUrlParser: true });
require('./models/Tweet'); // load Tweet Model
require('./models/Utilisateur'); // load User Model

// instanciation
var app = express(); 

/* "quand je vais taper dans mon navigateur localhost+port /css , il va prendre
ce chemin" : __dirname+'/node_modules/bootstrap/dist/css' (dirname indique le lieu utilisé actuellement :
ici app.js donc on est dans le dossier
twittux) */

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // middleware pour fichier static (bootstrap)
app.use('/assets', express.static('assets'));   
app.use('/images', express.static('images')); // charge les images

app.use(cookieParser());

//Middleware for routes
app.use('/login', require('./routes/login'))
app.use('/signup', require('./routes/inscription'))
app.use('/home', require('./routes/home'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler (its for use next param)
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;

app.listen(3000);

console.log("lamentux is starting");