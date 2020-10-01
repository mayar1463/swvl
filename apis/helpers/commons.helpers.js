const fs = require('fs');

/*!
 * filename is name of json file 
 * data is the array of obejct
 * return nothing
 * this method is for to save data in file
 */
const saveData = (filename, data) => {
    fs.writeFileSync(filename, JSON.stringify(data), 'utf8', (err) => {
        if (err) {
            return false
        } else {
            return true
        }
    });
}


/*!
 * findRecord: This methods find the object|objects corresponding to given id from the list.
 * params 
    *  1: filename is name of json file etc sms.json 
    *  2: id is either id,phone and group_id
    *  3: type diffrentiat the table
 */
const findRecordById = (filename, id, type = null) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(filename, 'utf8', (err, dataArray) => {
                if (err) {
                    reject(err)
                }
                (dataArray != '') ? dataArray = JSON.parse(dataArray) : dataArray = [];
                let row = '';
                if (type === 'byCustomerId') {
                    row = dataArray.filter(r => {
                        if (r.customer_id == id) return r;
                    }); // this check is to find notifications or customer by id
                }
                else if (type === 'byPromoCode') {
                    row = dataArray.find(r => r.code == id) // // this check promo code
                }
                else if (type === 'byGroupId') {
                    row = dataArray.filter(r => {
                        if (r.group_id == id) return r;
                    }); // // this check is to find group_id
                    console.log(row);
                }
                else {
                    row = dataArray.find(r => r.id == id) // this check is to find by id
                }
                if ((!row || 0 === row.length)) {
                    reject({
                        message: 'No Record found!',
                        status: 404
                    })
                }
                else {
                    resolve(row);
                }
            });
        }
        catch (err) {
            reject({
                message: err,
                status: 500
            })
        }
    });
}


/*!
 * findRecord: This methods find the object|objects corresponding to given id from the list.
 * params 
    *  1: filename is name of json file etc sms.json 
    *  2: phone is the key to find result.
 */
const findRecordByPhone = (filename, phone) => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(filename, 'utf8', (err, dataArray) => {
                if (err) {
                    reject(err)
                }
                (dataArray != '') ? dataArray = JSON.parse(dataArray) : dataArray = [];
                let row = dataArray.find(r => r.phone == phone) // this check by phone
                if (row) {
                    resolve({ status: true, phone: phone })
                } else {
                    resolve({ status: false, phone: phone })
                }
            });
        }
        catch (err) {
            reject({
                message: err,
                status: 500
            })
        }
    });
}


// Read file and parse into json and return array of objects or not conten found
const readData = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, rawdata) => {
            if (err) {
                reject(err)
            }
            try {
                resolve(JSON.parse(rawdata));
            }
            catch (error) {
                resolve(false);
            }
        });
    });
}
// Get current date time
const currentDate = (filename) => {
    return new Date().toISOString();
}

module.exports = {
    saveData,
    findRecordById,
    findRecordByPhone,
    readData,
    currentDate
}