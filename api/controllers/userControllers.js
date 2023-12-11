import asyncHandler from 'express-async-handler'

// @description     Auth user/set token
// route    POST /api/users/auth
// @access public
export const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Auth User'})
})

// @description     Register a new user
// route POST /api/users
// @access public
export const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Register User' })
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