const express = require('express');
const contact = require('../../controllers/contact/contact.controller')
const cors = require('cors');

const router = express.Router()

router.get('/findByUser/:userId', contact.findContactByUser)

router.put('/update/:contactId', contact.updateContact)

router.delete('/deleteByModel/:userId/:modelId', contact.deleteByModel)

router.delete('/delete/:id', contact.delete)

module.exports = router