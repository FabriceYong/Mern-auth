import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcrypt'

// @description     Auth user/set token
// route    POST /api/users/auth
// @access public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    console.log(user)

    if(!user) {
        res.status(404);
        throw new Error('User not found')
    }
    const hashedPassword = await bcrypt.hash(password, user.password)

    if(user && hashedPassword) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }
})

// @description     Register a new user
// route POST /api/users
// @access public
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    // check if user is already registered
    const userExists = await User.findOne({ email })
    if(userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    // if user does not exist, create a new user
    const newUser = User.create({ email, password, username })
    // if user is created
    if(newUser) {
        generateToken(res, newUser._id)
        res.status(201).json({ _id: newUser._id, username: newUser.username, email: newUser.email})
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})

// @description     Logout a user
// route POST /api/users/logout
// @access public
export const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Logout User' })
})

// @description     Get user profile
// route    GET /api/users/profile
//access public
export const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get User Profile' })
})

// @description     Update user profile
// route     PUT /api/users/profile
//@access   public
export const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Update User profile'})
})