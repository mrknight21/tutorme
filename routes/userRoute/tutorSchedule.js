const express = require('express');
const router = express.Router();
const con = require('../../javascript/connection');
const weekly = require("../../javascript/tutorSchedule3WeekPreRendering");

router.get('/', function (req, res) {
    var promise = weekly.Oneweek(undefined, req.session.username,'tableTime','timeStart');

    promise.then(function (value) {
        console.log(value);
        res.render("./userView/tutorSchedule.ejs", {value:value, userDetails: req.session.username, sess: req.session});
    })
});

router.get('/booking',function (req, res) {
    console.log(req.query);
    console.log("from listing");
});

module.exports = router;