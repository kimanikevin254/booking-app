const User = require("../models/userModel")
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // Make sure all fields have values
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add the required fields')
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('This email account has been registered. Please log in.')
    }

    // create user
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userDoc = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(userDoc){
        res.status(200).json({
            _id: userDoc._id,
            email: userDoc.email,
            name: userDoc.name,
            token: generateToken(userDoc._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Make sure all fields have values
    if(!email || !password){
        res.status(400)
        throw new Error('Please add the required fields')
    }

    // Check if user exists
    const user = await User.findOne({email})

    if(!user){
        res.status(400)
        throw new Error('Account not found. Please create an account')
    }

    // retrieve user
    // check if email and password match
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid login credentials')
    }

})

// generate jwt
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET)

module.exports = {
    registerUser,
    loginUser
}