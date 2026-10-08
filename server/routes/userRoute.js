import express from 'express'
import { addUserToChat, getProfile, updateProfile, userLogin, userRegister } from '../controllers/userControllers.js'
import { userAuth } from '../middlewares/authMiddleware.js'
import uplpoad from '../middlewares/multer.js'
import { getUsersForSidebar } from '../controllers/messageController.js'

const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)
userRouter.get('/profile', userAuth, getProfile)
userRouter.patch('/profile/update-profile', userAuth, uplpoad.single('profileImage'), updateProfile)
userRouter.get('/sidebar-users', userAuth, getUsersForSidebar)
userRouter.post('/chat/add/:id', userAuth, addUserToChat)

export default userRouter