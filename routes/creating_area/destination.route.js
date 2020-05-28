const express = require('express');
const destination = require('../../controllers/creating_area/destination.controller');

const router = express.Router()

router.post('/add', destination.createDestination)

router.get('/findAll/:userId/:modelId', destination.findDestinations)

router.delete('/delete/:destinationId/:userId/:modelId', destination.deleteDestination)

router.put('/update/:destinationId/:userId/:modelId', destination.updateDestination)

module.exports = router;