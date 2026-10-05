import express from 'express'
import { getProfile, userLogin, userRegister } from '../controllers/userControllers.js'
import { userAuth } from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.get('/profile', userAuth, getProfile)

export default userRouter