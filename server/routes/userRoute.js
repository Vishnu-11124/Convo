import express from 'express'
import { getProfile, updateProfile, userLogin, userRegister } from '../controllers/userControllers.js'
import { userAuth } from '../middlewares/authMiddleware.js'
import uplpoad from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.get('/profile', userAuth, getProfile)
userRouter.patch('/profile/update-profile', userAuth, uplpoad.single('profileImage'), updateProfile)

export default userRouter