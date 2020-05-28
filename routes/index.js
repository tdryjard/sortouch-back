const express = require('express');
const question = require('./creating_area/question.route')
const response = require('./creating_area/reply.route')
const destination = require('./creating_area/destination.route')
const container = require('./creating_area/container.route')
const relation = require('./creating_area/relation_container.route')
const category = require('./message_space/category.route')
const model = require('./model_space/model.route')
const mail = require('./mail/mail.route')
const user = require('./register/register.route')
const subscription = require('./subscription/subscription.route')
const contact = require('./contact/contact.route')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.use('/question', question);

router.use('/response', response);

router.use('/destination', destination)

router.use('/container', container)

router.use('/relation', relation)

router.use('/category', category)

router.use('/model', model)

router.use('/mail', mail)

router.use('/user', user)

router.use('/subscription', subscription)

router.use('/contact', contact)

router.use('/v1/customers', (req, res) => {
    console.log(req.body.email)
    stripe.customers.create(
        {
          description: 'Customer Sortouch',
          email: req.body.email
        },
        function(err, customer) {
          // asynchronously called
          console.log(customer)
        }
      );
})

router.use('/create-subscription', async (req, res) => {
    try {
      await stripe.paymentMethods.attach(req.body.paymentMethodId, {
        customer: req.body.customerId,
      });
    } catch (error) {
      return res.status('402').send({ error: { message: error.message } });
    }
    await stripe.customers.update(
      req.body.customerId,
      {
        invoice_settings: {
          default_payment_method: req.body.paymentMethodId,
        },
      }
    );
    const subscription = await stripe.subscriptions.create({
      customer: req.body.customerId,
      items: [{ price: 'price_H1NlVtpo6ubk0m' }],
      expand: ['latest_invoice.payment_intent'],
    });
    res.send(subscription);
  });

module.exports = router;