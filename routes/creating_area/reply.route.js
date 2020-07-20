const express = require('express');
const reply = require('../../controllers/creating_area/reply.controller');

const router = express.Router()

router.post('/add', reply.createReply)

router.delete('/delete/:replyId/:userId/:modelId', reply.deleteReply)

router.delete('/deleteByModel/:userId/:modelId', reply.deleteByModel)

router.put('/update/:replyId/:userId/:modelId', reply.updateReply)

module.exports = router; 