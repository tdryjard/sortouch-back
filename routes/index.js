const express = require('express');
const question = require('./creating_area/question.route')
const response = require('./creating_area/reply.route')
const container = require('./creating_area/container.route')
const relation = require('./creating_area/relation_container.route')
const category = require('./creating_area/category.route')
const model = require('./model_space/model.route')
const mail = require('./mail/mail.route')
const user = require('./register/register.route')
const contact = require('./contact/contact.route')
const onepage = require('./onepage/onepage.route')
const image = require('./image/image.route')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const router = express.Router();

router.use(cookieParser());

router.use('/question', cors({credentials: true, origin: process.env.ORIGIN_URL}), question);

router.use('/response', cors({credentials: true, origin: process.env.ORIGIN_URL}), response);

router.use('/container', cors({credentials: true, origin: process.env.ORIGIN_URL}), container)

router.use('/relation', cors({credentials: true, origin: process.env.ORIGIN_URL}), relation)

router.use('/category', cors({credentials: true, origin: process.env.ORIGIN_URL}), category)

router.use('/model', cors({credentials: true, origin: process.env.ORIGIN_URL}), model)

router.use('/mail', cors({credentials: true, origin: process.env.ORIGIN_URL}), mail)

router.use('/user', cors({credentials: true, origin: process.env.ORIGIN_URL}), user)

router.use('/contact', cors({credentials: true, origin: process.env.ORIGIN_URL}), contact)

router.use('/onepage', cors({credentials: true, origin: process.env.ORIGIN_URL}), onepage)

router.use('/image', cors({credentials: true, origin: process.env.ORIGIN_URL}), image)

router.use('/create-customer', async (req, res) => {
  // Create a new customer object
  const customer = await stripe.customers.create({
    email: req.body.email,
    name: req.body.name
  });

  // Recommendation: save the customer.id in your database.
  res.send({ customer });
});

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
    items: [{ price: 'price_1GwZJxKleZ50Ivn6n5S03e4U' }],
    expand: ['latest_invoice.payment_intent'],
  });
  res.send(subscription);
});

router.use('/create-subscription-2', async (req, res) => {
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
    items: [{ price: 'price_1GwZNuKleZ50Ivn6rjynly4I' }],
    expand: ['latest_invoice.payment_intent'],
  });
  res.send(subscription);
});

router.use('/cancel-subscription', async (req, res) => {
  // Delete the subscription
  const deletedSubscription = await stripe.subscriptions.del(
    req.body.subscriptionId
  );
  res.send(deletedSubscription);
});

router.use('/cookie', cors({credentials: true, origin: process.env.ORIGIN_URL}), function (req, res) {


    // Génération du jsonWebToken
    const token = jwt.sign('5', `${process.env.SECRET_KEY}`);

    res.cookie('token', token, { maxAge: (Date.now() / 1000 + (60 * 60 * 120)), httpOnly: true});
    res.send('cookie ok')
})

module.exports = router;