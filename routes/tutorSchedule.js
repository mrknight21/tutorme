const express = require('express');
const router = express.Router();

const tutor = {
    "userName": ["Vanie"],
    "idAvailable": [],
    "idBooked": [],
    "course": [],
    "tutee": []
}

const availability = {
    "time": ["12040800", "12041200", "12041300", "12041200", "12042000", "12041000"],
    "date": [2, 3, 5, 6, 7, 4]

}
const booking = {
    "course": ["eat", "sleep", "run"],
    "tutee": ["lamlam", "pikachu", "jojo"],
    "time": ["12040800", "12041200", "12041300"],
    "date": [2, 3, 5]
}

router.get('/', function (req, res) {

    const numOfATimeUnit = availability.time;

    for (i = 0; i < numOfATimeUnit.length; i++) {
        const id1 = availability.date[i];
        var id2 = availability.time[i].slice(4, 6);
        if (id2.charAt(0) === "0") {
            id2 = availability.time[i].slice(5, 6);
        } else {
            id2 = availability.time[i].slice(4, 6);
        }
        // tutor.idAvailable.add(id1+"."+id2);
        num = id1 + "." + id2;
        if (num.endsWith(0)) {
            console.log(num);
            num *= 100;
        }

        tutor.idAvailable.push(num);
    }

    const numOfBTimeUnit = booking.time;
    for (i = 0; i < numOfBTimeUnit.length; i++) {
        const id1 = booking.date[i];
        var id2 = booking.time[i].slice(4, 6);
        if (id2.charAt(0) === "0") {
            id2 = booking.time[i].slice(5, 6);
        } else {
            id2 = booking.time[i].slice(4, 6);
        }
        tutor.idBooked.push(id1 + "." + id2);
        tutor.course.push(booking.course[i]);
    }
    tutor.course = setParsing(tutor.course);
    tutor.idAvailable = setParsing(tutor.idAvailable);
    tutor.idBooked = setParsing(tutor.idBooked);
    console.log(tutor.idAvailable);
    console.log( tutor.course= tutor.course.map(function (n) {
        console.log(n.toString());
        return n.toString()
    }));

    res.render('tutorSchedule', tutor);


});

function setParsing(list) {
    var list = new Set(list);
    return Array.from(list);
}

module.exports = router;