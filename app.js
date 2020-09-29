const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
require('dotenv').config();
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

var options = {
  swaggerOptions: {
    url: 'http://petstore.swagger.io/v2/swagger.json'
  }
}
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined', { stream: accessLogStream }))
app.use(limiter);
app.use(helmet({}));
app.use(require('./src/routes/index'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: "not found!" })
});
// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({ message: err.message })
});


module.exports = app
