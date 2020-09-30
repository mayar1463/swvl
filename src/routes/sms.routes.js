const express = require('express');
const { sms } = require('../controllers');
const { commons, communication } = require('../../helpers')
const Joi = require('joi');
const router = express.Router();
communication.startInterVal();
/*!
 * Send sms
 * Reture 201 in case of success, return 422 in case of client error and return 500 in case of server errors
 */
router.post('/', async (req, res) => {
  try {
    const schema = Joi.object({
      phones: Joi.array().items(Joi.object({
        phone: Joi.number().required()
      })).required(),
      promocode: Joi.string().regex(/[0-9]/, { name: 'promocode' }).length(6).required()
    });
    const validation = schema.validate(req.body);
    if (validation.error != undefined && validation.error != null) {
      res.status(422).json({
        message: 'Invalid request',
        errors: validation.error.message
      })
    } else {
      let phones = req.body.phones;
      for (i = 0; i < phones.length; i++) {
        await sms.addSMS(phones[i].phone, req.body.promocode);
      }
      await communication.startInterVal()
      res.status(201).json({ message: "send" })
    }
  } catch (err) {
    console.log('post, route, api/v1/sms, errors_', err);
    res.status(err.status || 500).json({ message: err })
  }
});


module.exports = router;
