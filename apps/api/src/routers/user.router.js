import { Router } from 'express'
import {
  updateUsernameController,
  updateEmailController,
  updatePasswordController,
  uploadAvatarFileController,
  findAdminController,
  findUserController,
  updateUserController,
  deleteUserController,
  createUserController,
  findUserListController
} from '../controllers/user.controller'
import { uploadAvatarFile } from '../middleware/multer.middleware'
import { checkRoleSuperadmin, checkRoleAdmin, verifyToken } from '../middleware/auth.middleware'
import { validator } from '../middleware/validator.middleware';
import { body } from "express-validator";
const multer = require('multer')

const userRouter = Router()

const emailValidations = [
	body("email").notEmpty().withMessage("Email cannot be emptied"),
	body("email").isEmail().withMessage("Email format is invalid"),
];
const usernameValidations = [
	body("username").notEmpty().withMessage("Username cannot be emptied"),
];
const passwordValidations = [
	body("password").notEmpty().withMessage("Password cannot be emptied")
	.matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'),
]
const postUserValidations = [
  body('email')
  .isEmail().withMessage('email is invalid')
  .notEmpty().withMessage('email is required'),
body('username')
  .notEmpty().withMessage('username is required')
  .matches(/^\S*$/).withMessage('username cannot contain spaces'),
body('roleId')
  .notEmpty().withMessage('role is required')
];

const patchUserValidations = [
  body('email')
  .optional()
  .isEmail().withMessage('email is invalid'),
body('username')
  .optional()
  .matches(/^\S*$/).withMessage('username cannot contain spaces')
];

const uploadAvatarMiddleware = (req, res, next) => {
  uploadAvatarFile(req, res, function(err) {
    if (err) {
      // Handling 'LIMIT_FILE_SIZE' error from 'multer'.
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: "File size should not exceed 1MB!" });
      }
      // Handling custom file type error.
      if (err.message === 'File type not allowed') {
        return res.status(400).json({ message: err.message });
      }
      // For other errors
      return res.status(500).json({ message: "An error occurred during the upload process, please try again." });
    }
    next();
  });
};

//GET
userRouter.get('/', verifyToken, checkRoleSuperadmin, findAdminController)
userRouter.get('/user', verifyToken, checkRoleSuperadmin, findUserController)
userRouter.get('/user-list', verifyToken, checkRoleSuperadmin, findUserListController)

//POST
userRouter.post('/', validator(postUserValidations), verifyToken, checkRoleSuperadmin, createUserController)

//PATCH
userRouter.patch('/:id', validator(patchUserValidations), verifyToken, checkRoleSuperadmin, updateUserController)
userRouter.patch('/update-username/:id', validator(usernameValidations),verifyToken, updateUsernameController)
userRouter.patch('/update-email/:id', validator(emailValidations), verifyToken, updateEmailController)
userRouter.patch('/update-password/:id', validator(passwordValidations), verifyToken, updatePasswordController)
userRouter.patch('/upload-avatar/:id', verifyToken, uploadAvatarMiddleware, uploadAvatarFileController)

//DELETE
userRouter.delete('/:id', verifyToken, checkRoleSuperadmin, deleteUserController)

export { userRouter }
