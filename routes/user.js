var router = require('express').Router();
var User = require('../models/user');

router.get('/signup', function(req, res, next) {
    res.render('../views/accounts/signup');
});

router.post('/signup', function(req, res) {
    var newUser = new User();
    newUser.profile.name = req.body.name;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    User.findOne({ email: req.body.email }, function(err, existingUser) {
        if (existingUser) {
            console.log(req.body.email + " already exists");
            return res.redirect('/signup');
        } else {
            newUser.save(function(err, user) {
                if (err) return next(err);

                res.json("New User has been created");
            });
        }
    });
});

module.exports = router;