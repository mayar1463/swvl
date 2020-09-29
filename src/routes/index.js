const express = require('express')
const { auth } = require('../middlewares/auth');
const router = express.Router()

router.all('/', (req, res) => {
    res.status(200).json({ message: 'Wellcome !' })
})

router.use('/api/v1/sms', require('./sms.routes'))
router.use('/api/v1/notifications', require('./notification.routes'))
module.exports = router