const express = require('express');
const mail = require('../../controllers/mail/mail.controller')

const router = express.Router()

router.get('/findByUser/:userId', mail.findMailByUser)

router.get('/find/:userId/:modelId/:categoryId', mail.findMailByCategory)

router.put('/update/:userId/:modelId/:categoryId/:mailId', mail.updateMail)

router.put('/updateSimple/:mailId', mail.updateMailWithId)

router.delete('/delete/:userId', mail.deleteMail)

router.delete('/deleteByModel/:userId/:modelId', mail.deleteByModel)

module.exports = router