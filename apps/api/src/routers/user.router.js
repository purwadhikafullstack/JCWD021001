import { Router } from 'express'
import {
  updateUsernameController,
  updateEmailController,
  updatePasswordController,
  uploadAvatarFileController,
  findAdminController,
  findUserController,
  updateUserController,
  deleteUserController
} from '../controllers/user.controller'
import { uploadAvatarFile } from '../middleware/multer.middleware'
import { checkRoleSuperadmin, checkRoleAdmin, verifyToken } from '../middleware/auth.middleware'

const userRouter = Router()

//GET
userRouter.get('/', verifyToken, checkRoleSuperadmin, findAdminController)
userRouter.get('/user', verifyToken, checkRoleSuperadmin, findUserController)

//PATCH
userRouter.patch('/:id', verifyToken, checkRoleSuperadmin, updateUserController)
userRouter.patch('/update-username/:id', verifyToken, updateUsernameController)
userRouter.patch('/update-email/:id', verifyToken, updateEmailController)
userRouter.patch('/update-password/:id', verifyToken, updatePasswordController)
userRouter.patch('/upload-avatar/:id', verifyToken, uploadAvatarFile, uploadAvatarFileController)

//DELETE
userRouter.delete('/:id', verifyToken, checkRoleSuperadmin, deleteUserController)

export { userRouter }
