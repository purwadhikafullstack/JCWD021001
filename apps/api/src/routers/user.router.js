import { Router } from 'express';
import { updateUsernameController, updateEmailController, updatePasswordController } from '../controllers/user.controller';
import { uploadAvatarFile } from '../middleware/multer';
const userRouter = Router();

// PATCH
userRouter.patch("/update-username/:id", updateUsernameController);
userRouter.patch("/update-email/:id", updateEmailController);
userRouter.patch("/update-password/:id", updatePasswordController);
userRouter.patch("/upload-avatar/:id", uploadAvatarFile)

export {userRouter};