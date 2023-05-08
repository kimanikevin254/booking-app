const asyncHandler = require('express-async-handler')
const path = require('path')
const download = require('image-downloader');
const fs = require('fs')

const uploadPhotoByLink = asyncHandler(async (req, res) => {
    const { link } = req.body

    // generate a name for the downloaded image
    const photoNewName = `image_${Date.now()}.jpg`

    // Download the image and save to temp_uploads
    const downloadOptions = {
      url: link,
      dest: `${path.join(__dirname, '..', '/temp_uploads')}/${photoNewName}`,
    };

    try {
     await download.image(downloadOptions)
     console.log(photoNewName)
     res.status(200).json({photoName: photoNewName})

    } catch (error) {
      console.log(error)
      res.status(400)
      throw new Error('Image not found')
    }
})
const uploadPhotoFromDevice = asyncHandler(async (req, res) => {
  const { path, originalname } = req.file

  // rename the stored image to add a file extension
  const newPhotoPath = `${path}.${originalname.split('.').pop()}`
  fs.renameSync(path, newPhotoPath)
  photoNewName = newPhotoPath.split('/').pop()
  res.status(200).json({photoName: photoNewName})
})

module.exports = { 
  uploadPhotoByLink,
  uploadPhotoFromDevice
}