var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');

var User = require('./models/user');

var app = express();

mongoose.connect('mongodb://root:abc123@ds157702.mlab.com:57702/ecommerce', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("connected");
    }
});

//Middleware
app.use(express.static(__dirname + "/public"));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

//grab the route file and use it
var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');
app.use(userRoutes);
app.use(mainRoutes);

//Create local server
app.get('/', function(req, res) {
    var name = "luca";
    res.json("My name is " + name);
});

app.get('/luca', function(req, res) {
    var name = "luca";
    res.json("My name is " + name);
});

app.listen(8091, function(err) {
    if (err) throw err;
    console.log("Server is Running");
});