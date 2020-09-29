const express = require('express');
const { sms } = require('../controllers');
const { commons, communication } = require('../../helpers')
const Joi = require('joi');
const router = express.Router();
communication.startInterVal();
/*!
 * Send sms
 * Reture 200 in case of success, return 400 in case of client error and return 500 in case of server errors
 */
router.post('/', async (req, res) => {
  try {
    const schema = Joi.object({
      phones: Joi.array().items(Joi.object({
        phone: Joi.number()
      })).required(),
      promocode: Joi.number().required(),
    });

    const validation = schema.validate(req.body);
    if (validation.error != undefined && validation.error != null) {
      res.status(422).json({
        message: 'Invalid request',
        data: validation.error.message
      })
    } else {
      let phones = req.body.phones;
      for (i = 0; i < phones.length; i++) {
        await sms.addSMS(phones[i].phone, req.body.promocode);
      }
      await communication.startInterVal()
      res.status(201).json({ message: "send" })
    }
  }
  catch (err) {
    console.log(err);
  }
});


module.exports = router;
