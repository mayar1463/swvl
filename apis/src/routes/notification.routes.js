const express = require('express');
const { notification } = require('../controllers');
const { commons, communication } = require('../../helpers')
const groupCustomersFile = '../data/groupCustomers.json';
const Joi = require('joi');
const router = express.Router();
/*!
* Get all notifications
* Reture array of objects
* If not exist return 204
*/
router.get('/:customer_id', async (req, res) => {
  try {
    const schema = Joi.object({
      customer_id: Joi.number().required()
    });
    const validation = schema.validate(req.params);
    if (validation.error != undefined && validation.error != null) {
      res.status(422).json({
        message: 'Invalid request',
        errors: validation.error.message
      })
    } else {
      await notification.getAllNotifications(req.params.customer_id)
        .then(notifications => res.json(notifications))
        .catch(err => {
          res.status(err.status || 500).json({ message: err.message })
        })
    }
  } catch (err) {
    console.log('get, route, api/v1/notifications/{id}, errors_', err);
    res.status(err.status || 500).json({ message: err })
  }

});


/*!
* send notification
 * Reture 200 in case of success, return 400 in case of client error and return 500 in case of server errors
*/
router.post('/', async (req, res) => {
  try {
    const schema = Joi.alternatives().conditional(Joi.object({ 'type': 'individual' }).unknown(), {
      then: Joi.object({
        customer_id: Joi.number().required(),
        message: Joi.string().required(),
        type: Joi.string().valid('individual', 'group'),
      }),
      otherwise: Joi.object({
        message: Joi.string().required(),
        group_id: Joi.number().required(),
        type: Joi.string().valid('individual', 'group'),
      })
    });

    const validation = schema.validate(req.body);
    if (validation.error != undefined && validation.error != null) {
      res.status(422).json({
        message: 'Invalid request',
        errors: validation.error.message
      })
    } else {
      if (req.body.type === 'group') {
        await commons.findRecordById(groupCustomersFile, req.body.group_id, 'byGroupId').then(customers => {
          (async () => {
            let errorArray = [];
            let successArray = [];
            for (i = 0; i < customers.length; i++) {
              let newNotification = {};
              newNotification.message = req.body.message;
              newNotification.customer_id = customers[i].customer_id;
              await notification.addNotification(newNotification)
                .then(newNotification => {
                  successArray.push(newNotification.id);
                })
            }
            res.status(201).json({
              message: `The Notification has been send`,
              ids: successArray
            })
          })();
        }).catch(err => {
          res.status(err.status || 500).json({ message: err.message })
        })

      } else {
        let newNotification = req.body;
        await notification.addNotification(newNotification)
          .then(newNotification => res.status(201).json({
            message: `The Notification has been send`,
            id: newNotification.id
          }))
          .catch(err => {
            res.status(err.status || 500).json({ message: err.message })
          })
      }
    }
  } catch (err) {
    console.log('Post, route, api/v1/notifications, errors_', err);
    res.status(err.status || 500).json({ message: err })
  }
});


module.exports = router;
