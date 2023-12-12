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
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    
    res.status(200).json({ message: 'User logged out' })
})

// @description     Get user profile
// route    GET /api/users/profile
//access public
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email
    }

    res.status(200).json({ user })
})

// @description     Update user profile
// route     PUT /api/users/profile
//@access   public
export const updateUserProfile = asyncHandler(async (req, res) => {
    // get user profile by id
    const user = await User.findById(req.user._id)
    if(user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.status(200).json({ 
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})