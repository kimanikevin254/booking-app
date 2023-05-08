const mongoose = require("mongoose")

const { Schema } = mongoose

const accomodationSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    price: Number,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number
})

const accomodationModel = mongoose.model('Accomodation', accomodationSchema)

module.exports = accomodationModel