const fs = require('fs');
const smsFile = '../data/sms.json';
require('dotenv').config();
let intervalID = "";
let checkMinute=0;
let currentMinute=0;
let smsCounter=1;
//const fcmadmin = require("firebase-admin");
//const fcemail = require("firebase-admin");

/*!
 * token is registration token of mobile device ,msg and type
 * type diffrentiat diffrent type of notification
 * return bool true or false
 * this method is for send puh notification
 */


const startInterVal = () => {
    let d = new Date();
    currentMinute = d.getMinutes();
    intervalID = setInterval(getPhoneNumber, 5000);
}


const getPhoneNumber = async () => {
    fs.readFile(smsFile, 'utf8', (err, dataArray) => {
        (dataArray != '') ? dataArray = JSON.parse(dataArray) : dataArray = [];
        if (dataArray.length > 0) {
            dataArray.slice(0, process.env.PERMINUTECALL).map((currElement, index) => {
                smsCounter+=index;
                // console.log("index____",index);
                // console.log("smsCounter",smsCounter);
                sendSMS(currElement.phone, currElement.promocode)
                dataArray.shift();
            });
            fs.writeFileSync(smsFile, JSON.stringify(dataArray), 'utf8', (err) => {
                if (err) {
                    return false
                } else {
                    return true
                }
            });
        }
        else {
            clearIntervalCall(intervalID)
        }

    });
}


const clearIntervalCall = async (id) => {
    clearInterval(id);
}


const sendNotification = (token, msg, type) => {
}



/*!
 * number and msg
 * return bool true or false
 * this method is for send email
 */
const sendSMS = (phone, promocode) => {
    return true;
}



module.exports = {
    sendNotification,
    sendSMS,
    startInterVal
}