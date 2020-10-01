 'user strict';//user strict mayar
const util = require('util')
const mysql = require('mysql')
let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'host',
    user: 'root',
    password: 'password',
    database: 'database',
    timezone: 'UTC',
    insecureAuth: false,
    port:3306
})
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        else if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
        else
        {
            console.log('unknown errors mm',err);
        }
    } else {
        console.log('Database connection is created');
    } 
    if (connection) connection.release()
    return
})
// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool