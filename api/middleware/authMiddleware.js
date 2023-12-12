import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt
    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user by user id
            req.user = await User.findById(decoded.userId).select('-password') // -password makes it so the password doesn't get returned alongside the user information
            next()
        } catch(err) {
            res.status(401);
            throw new Error('Unauthorized access attempt, invalid user token')
        }
    } else{
        res.status(401)
        throw new Error('Unauthorized access attempt, invalid user token')
    }
})

export { protect }