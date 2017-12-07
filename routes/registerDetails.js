var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var con = require('../javascript/connection.js');
const hasher = require('password-hash-and-salt');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false}));

router.post('/', function(req, res) {

    const connectNow = con.method();

    connectNow.connect(function(err){
        if (err) throw err;
        console.log("Connected and online!");
    });

    console.log("Working");

    var un = req.body.userName;
    var fn = req.body.firstName;
    var ln = req.body.lastName;
    var em = req.body.email;
    var ad = req.body.address;
    var doob = req.body.dateOfBirth;
    var studentID = req.body.studentId;
    var studySchool = req.body.school;
    var tutor_activation = req.body.tutorActivation;

    console.log("ready to query");


    /* firts query to make the user in user table*/
    connectNow.query("INSERT INTO tableUser (username, firstName, lastName, email, address, dob, studentID, studySchool, tutor_activation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        , [un, fn, ln, em, ad, doob, studentID, studySchool, tutor_activation], function(err, result) {
        console.log("member registered!!");

        /*after user account is built create a hashed password query*/
            var pwd = req.body.pwd;
            hasher(pwd).hash(function(error, hash) {
                if(error) throw new Error('Something went wrong!');
                connectNow.query("INSERT INTO tablePassword (username, hash) VALUES(?, ?)", [un, hash], function(err, result){
                    connectNow.end();
                    if (err) {
                        throw err;
                    }
                });
            });
        if (err) {
            throw err;
        }
    });
    res.redirect("/");
});

// router.get('/', function(req, res) {
//
//     var un = req.query.userName;
//     var pwd = req.query.pwd;
//     var fn = req.query.firstName;
//     var ln = req.query.lastName;
//     var em = req.query.email;
//     var ad = req.query.address;
//     var doob = req.query.dateOfBirth;
//     var studentID = req.query.studentId;
//     var studySchool = req.query.school;
//     var tutor_activation = req.query.tutorActivation;
//
//     console.log("ready to query");
//
//     con.query("INSERT INTO tableUser (username, password, firstName, lastName, email, address, dob, studentID, studySchool, tutor_activation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [un, pwd, fn, ln, em, ad, doob, studentID, studySchool, tutor_activation], function(err, result) {
//         con.end();
//         if (err) throw err;
//     });
//
//     res.render("registeredPage");
// });

module.exports = router;