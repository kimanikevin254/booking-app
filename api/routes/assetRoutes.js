const express = require('express')
const { uploadPhotoByLink, uploadPhotoFromDevice } = require('../controllers/assetController')
const router = express.Router()
const multer  = require('multer')
const path = require('path')


const photoMiddleware = multer({ dest: `${path.join(__dirname, '..', 'temp_uploads')}`})


router.post('/addPhotoByLink', uploadPhotoByLink)
router.post('/addPhotoFromDevice', photoMiddleware.single('photo'), uploadPhotoFromDevice)

module.exports = router