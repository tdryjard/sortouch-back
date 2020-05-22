const express = require('express');
const contact = require('../../controllers/contact/contact.controller')

const router = express.Router()

router.post('/create', contact.createContact)

router.get('/findByUser/:userId', contact.findContactByUser)

router.put('/update/:contactId', contact.updateContact)

module.exports = router