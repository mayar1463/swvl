const fs = require('fs');
const smsFile = '../data/sms.json';
require('dotenv').config();
let d1 = new Date();
let intervalID = "";
let checkMinute = d1.getMinutes();;
let currentMinute = 0;
let smsCounter = 0;
//const fcmadmin = require("firebase-admin");
//const fcemail = require("firebase-admin");

/*!
 * token is registration token of mobile device ,msg and type
 * type diffrentiat diffrent type of notification
 * return bool true or false
 * this method is for send puh notification
 */


const startInterVal = () => {
    intervalID = setInterval(getPhoneNumber, 5000);
}


const getPhoneNumber = async () => {
    let d = new Date();
    currentMinute = d.getMinutes();
    console.log('____timer start__smsCounter____', smsCounter,"_checkMinute_",checkMinute,"_currentMinute__",currentMinute);
    if (checkMinute === currentMinute && smsCounter < process.env.PERMINUTECALL)  {
            console.log("____Read Data____");
            fs.readFile(smsFile, 'utf8', (err, dataArray) => {
                (dataArray != '') ? dataArray = JSON.parse(dataArray) : dataArray = [];
                if (dataArray.length > 0) {
                    dataArray.slice(0, (process.env.PERMINUTECALL - smsCounter)).map((currElement, index) => {
                        smsCounter++;
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
                    console.log('clear timer')
                    clearIntervalCall(intervalID)
                }
            });
    } else if (checkMinute != currentMinute) {
        checkMinute = currentMinute;
        smsCounter = 0;
        console.log('set the check values');
    }
}


const clearIntervalCall = async (id) => {
    clearInterval(id);
}


const sendNotification = (token, msg, type) => {
    // send push notification using fcm or APNS
    // let notifications = [
    //     new BasicNotification(token, msg),
    //   ]
    // try {
    //     await client.send(sn)
    //   } catch (err) {
    //     console.error(err.reason)
    //   }
    return true;
}



/*!
 * number and msg
 * return bool true or false
 * this method is for send email
 */
const sendSMS = (phone, promocode) => {
    // third part module to send sms
    //async smsService.sendSMS(phone,promocode);
    return true;
}



module.exports = {
    sendNotification,
    sendSMS,
    startInterVal
}