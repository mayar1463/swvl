'user strict';
const notificationsFile = '../data/notifications.json';
const customerFile = '../data/customers.json';
const { commons } = require('../../helpers');


// Retrieve all notifications
const getAllNotifications = (customer_id) => {
    return new Promise((resolve, reject) => {
        commons.findRecordById(notificationsFile, customer_id,type='byCustomerId')// check by customer_id 
            .then(notifications => resolve(notifications))
            .catch(err => reject(err))
    });
}

// add customer notification
const addNotification = (notification) => {
    return new Promise((resolve, reject) => {
        commons.findRecordById(customerFile, notification.customer_id)// check customer id is valid or not
            .then(customer => {
                commons.readData(notificationsFile)
                    .then(notifications => {
                        newNotification = {};
                        newNotification.id = parseInt(Date.now());
                        newNotification.customer_id = notification.customer_id;
                        newNotification.message = notification.message;
                        newNotification.registration_id = customer.device_info.device_token;
                        newNotification.createdAt = commons.currentDate();
                        newNotification.updatedAt = commons.currentDate();
                        notifications.push(newNotification)
                        commons.saveData(notificationsFile, notifications)
                        resolve(newNotification)
                    })
                    .catch(err => reject(err))
            })
            .catch(err => reject({
                message: `customer is not found!`,
                status: 400
            }))
    });
}



module.exports = {
    getAllNotifications,
    addNotification
};