import { Router } from 'express';
import { updateUsernameController, updateEmailController, updatePasswordController, uploadAvatarFileController } from '../controllers/user.controller';
import { uploadAvatarFile } from '../middleware/multer.middleware';
const userRouter = Router();

// PATCH
userRouter.patch("/update-username/:id", updateUsernameController);
userRouter.patch("/update-email/:id", updateEmailController);
userRouter.patch("/update-password/:id", updatePasswordController);
userRouter.patch("/upload-avatar/:id", uploadAvatarFile, uploadAvatarFileController)

export {userRouter};