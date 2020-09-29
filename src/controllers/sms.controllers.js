const smsFile = './data/sms.json'
const { commons } = require('../../helpers');

// Add sms against customer
const addSMS = async (phone, promocode) => {
    return new Promise((resolve, reject) => {
        commons.findRecordByPhone(smsFile, phone)// check phone number
            .then(result => {
                if (!result.status) {
                    commons.readData(smsFile)
                        .then(Phones => {
                            if (Phones == '' || Phones.length == 0)
                                Phones = [];

                            let newPhone = {};
                            newPhone.id = parseInt(Date.now());
                            newPhone.phone = phone;
                            newPhone.promocode = promocode;
                            newPhone.createdAt = commons.currentDate();
                            newPhone.updatedAt = commons.currentDate();
                            Phones.push(newPhone)
                            commons.saveData(smsFile, Phones)
                            resolve(true)
                        })
                } else {
                    resolve(true);
                }
            })
    })
}

module.exports = {
    addSMS
};