const con = require("./connection.js");
const mysql = require("mysql");

function renderingOneweek(connectNow,  startOfWeek, endOfWeek, username, timeTable, whatWanted) {
    if (connectNow === undefined) {
        console.log("making connection in one week");
        const connectNow = con.method();
        connectNow.connect(function (err) {
            if (err) {
                connectNow.end();
                throw err;
            }
        });
    }
    console.log("one week");
    var today;
    // (date === undefined) ? today = new Date() : today = new Date(date);
    // var startOfWeek = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - (today.getDay() - 2) - 1));
    // const endOfWeek = new Date(today.getFullYear(), today.getMonth(), (today.getDate() + (7 - today.getDay() + 1)));
    // console.log("Start date: "+ startOfWeek);
    // console.log("End date: "+ endOfWeek);
    const promise = new Promise(function (resolve, reject) {
        connectNow.query("SELECT " + (String(mysql.escape(whatWanted))).replace(/'/g, " ") + " FROM " + (String(mysql.escape(timeTable))).replace(/'/g, " ") + " Where timeStart>=? AND timeStart<=? AND username=?", [startOfWeek, endOfWeek, username], function (err, result) {
            if (err) {
                connectNow.end();
                throw err;
            } else {
                rawOject = JSON.parse(JSON.stringify(result));
                //console.log(rawOject);
                rawOject.map(function (value) {
                    value.timeStart = new Date(value.timeStart);
                });
               // console.log(rawOject);
                resolve(rawOject);
            }
        })
    });
    //console.log("Tutor " + tutor);
    return promise;
};

function tutorBooked(connectNow,  startOfWeek, endOfWeek, username, timeTable, whatWanted) {

    if (connectNow === undefined) {
        const connectNow = con.method();
        connectNow.connect(function (err) {
            if (err) {
                connectNow.end();
                throw err;
            }
        });
    }
    console.log("tutor booked");
    const promise = new Promise(function (resolve, reject) {
        connectNow.query("SELECT tableBooking.tuteeID, tableBooking.courseID, tableBooking.location, tableTime.timeStart, tableTimeOccupation.bookingID  FROM tableBooking, tableTime, tableTimeOccupation WHERE tableTimeOccupation.timeID = tableTime.timeID AND tableTimeOccupation.bookingID = tableBooking.bookingID And tableTime.timeStart>=? AND tableTime.timeStart<=? AND tableTime.username=?", [startOfWeek, endOfWeek,username], function (err, result) {
            if (err) {
                connectNow.end();
                throw err;
            } else {
                //console.log(result);
                rawObject = JSON.parse(JSON.stringify(result));
                //console.log(rawObject);
                rawObject.map(function (value) {
                    value.timeStart = new Date(value.timeStart);
                });
                //console.log(rawObject);
                resolve(rawObject)
            }
        })
    });
    return promise;
};

function tuteeSQLBookingCall(connectNow,  startOfWeek, endOfWeek, username, timeTable, whatWanted) {
    //var bookingID = 1;
    if (connectNow === undefined) {
        const connectNow = con.method();
        connectNow.connect(function (err) {
            if (err) {
                connectNow.end();
                throw err;
            }
        });
    };
    var today;
console.log("tuteeSQL")
    // (date === undefined) ? today = new Date() : today = new Date(date);
    // var startOfWeek = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - (today.getDay() - 2) - 1));
    // const endOfWeek = new Date(today.getFullYear(), today.getMonth(), (today.getDate() + (7 - today.getDay() + 1)));
    // console.log("Start date: "+ startOfWeek);
    // console.log("End date: "+ endOfWeek);
    const promise = new Promise(function (resolve, reject) {
            connectNow.query("SELECT tableBooking.tuteeID, tableBooking.courseID, tableBooking.location, tableTime.timeStart, tableTimeOccupation.bookingID  FROM tableBooking, tableTime, tableTimeOccupation WHERE tableTimeOccupation.timeID = tableTime.timeID AND tableTimeOccupation.bookingID = tableBooking.bookingID And tableTime.timeStart>=? AND tableTime.timeStart<=? AND tableBooking.tuteeID=?", [startOfWeek, endOfWeek, username], function (err, result) {
                connectNow.end();
                if (err) {
                    connectNow.end();
                    throw err;
                } else {
                    //console.log(result);
                    rawObject = JSON.parse(JSON.stringify(result));
                    //console.log(rawObject);
                    rawObject.map(function (value) {
                        value.timeStart = new Date(value.timeStart);
                    })
                }
                //console.log(rawOject);
                resolve(rawObject);
            });
        });
    return promise;
}


function JoinedScheduleCalls(ListOfPromises,connectNow, date, username, timeTable, whatWanted) {
    console.log(ListOfPromises.length);
    if (connectNow === undefined) {
        console.log("making connection in join");
        connectNow = con.method();
        connectNow.connect(function (err) {
            if (err) {
                connectNow.end();
                throw err;
            }
        });
    };
    console.log("joined");
    (date === undefined) ? today = new Date() : today = new Date(date);
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - (today.getDay() - 2) - 1));
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), (today.getDate() + (7 - today.getDay() + 1)));
        for(var i = 0; i < ListOfPromises.length; i++){
            ListOfPromises[i]= ListOfPromises[i](connectNow, startOfWeek, endOfWeek, username, timeTable, whatWanted);
            console.log(typeof ListOfPromises[i]);
        };
        console.log(ListOfPromises);
     const promise = new Promise(function (resolve, reject) {
        Promise.all(ListOfPromises).then(function (value) {
            console.log(ListOfPromises);
            connectNow.end();
            console.log("joined done!!");
            console.log(value);
            resolve(value);
        });
    });
    return promise;
}
module.exports = {Oneweek: renderingOneweek,tutorbooked: tutorBooked, tuteeSQLBookingCall: tuteeSQLBookingCall, joinedScheduleCalls:JoinedScheduleCalls};