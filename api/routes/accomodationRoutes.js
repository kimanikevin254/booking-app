const express = require('express')
const router = express.Router()
const { advertiseAccomodation, getAccomodations, getAccomodation, updateAccomodation, getAllAccomodations, getAnAccomodation } = require('../controllers/accomodationController')

router.post('/advertise', advertiseAccomodation)
router.post('/', getAccomodations)
router.post('/getAccomodation', getAccomodation)
router.post('/update', updateAccomodation)
router.get('/getAllAccomodations', getAllAccomodations)
router.post('/getAnAccomodation', getAnAccomodation)

module.exports = router