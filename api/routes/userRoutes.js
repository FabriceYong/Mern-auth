import express from 'express'
import { authUser, registerUser, updateUserProfile, logoutUser, getUserProfile } from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', registerUser)
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile) // protect routes from unauthorized access, access to the user information is protected so any attempt to access the user information goes through the 'protect' middleware to verify if the user is logged in before trying to fetch the user

export default router