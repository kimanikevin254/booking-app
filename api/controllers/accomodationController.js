const asyncHandler = require('express-async-handler')
const Accomodation = require('../models/accomodationModel')
const User = require("../models/userModel")

const advertiseAccomodation = asyncHandler(async (req, res) => {
    const { userId, title, price, address, description, uploadedImages, perks, extraInfo, checkInTime, checkOutTime, maxGuests } = req.body
    
    // Check if user exists
    const userExists = await User.findOne({userId})

    if(!userExists){
        res.status(400)
        res.json({message: 'Account not found'})
    }

    await Accomodation.create({
        owner: userId, 
        title, 
        price,
        address, 
        description, 
        photos: uploadedImages, 
        perks, 
        extraInfo, 
        checkIn: checkInTime, 
        checkOut: checkOutTime, 
        maxGuests
    })
    
    res.status(200).json({message: true})
})

const getAccomodations = asyncHandler(async (req, res) => {
    const { userId } = req.body 
    const myAccomodations = await Accomodation.find({owner: userId})
    res.status(200).json({accomodations: myAccomodations})
})

const getAccomodation = asyncHandler(async (req, res) => {
    const { userId, accomodationId } = req.body

    // Check if user exists
    const userExists = await User.findOne({userId})

    if(!userExists){
        res.status(400)
        res.json({message: 'Account not found'})
    }

    // check if accomodation exists
    const accomodationExists = await Accomodation.findOne({_id: accomodationId})

    if(!accomodationExists){
        res.status(400)
        res.json({message: 'Accomodation not found'})
    }

    res.status(200).json({
        accomodation: accomodationExists
    })
})

const updateAccomodation = asyncHandler(async (req, res) => {
    const { accomodationId, userId, title, price, address, description, uploadedImages, perks, extraInfo, checkIn: checkInTime, checkOut: checkOutTime, maxGuests } = req.body
    
    console.log(uploadedImages)
    
    const accomodationDoc = await Accomodation.findOne({_id: accomodationId})

    // console.log(accomodationExists)

    if(userId === accomodationDoc.owner.toString()){
        accomodationDoc.set({
            title, price, address, description, photos: uploadedImages, perks, extraInfo, checkInTime, checkOutTime, maxGuests
        })

        const newDoc = await accomodationDoc.save()

        console.log(newDoc)
    } 
    
    res.status(200).json({message: true})
})

const getAllAccomodations = asyncHandler(async (req, res) => {
    const accomodations = await Accomodation.find()

    console.log(accomodations)

    res.json({
        accomodations
    })
})

const getAnAccomodation = asyncHandler( async (req, res) => {
    const { listingId } = req.body

    // check if accomodation exists
    const accomodation = await Accomodation.findOne({_id: listingId})

    if(!accomodation){
        res.status(400)
        res.json({message: 'Accomodation not found'})
    }

    res.status(200).json({
        accomodation
    })
})

module.exports = { 
    advertiseAccomodation,
    getAccomodations,
    getAccomodation,
    updateAccomodation,
    getAllAccomodations,
    getAnAccomodation
 }