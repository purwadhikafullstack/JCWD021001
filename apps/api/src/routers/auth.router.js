import { Router } from 'express';
import { registerController, emailVerificationController, loginController, keepLoginController, forgotPasswordController, resetPasswordController, googleLoginController, newUnverifiedEmailController, verifyNewEmailController } from "../controllers/auth.controller";
import { validator } from '../middleware/validator.middleware';
import { verifyToken } from '../middleware/auth.middleware';
import { body } from "express-validator";
const authRouter = Router();

// VALIDATION USING EXPRESS VALIDATOR
const validations = [
	body("email").notEmpty().withMessage("Email cannot be emptied"),
	body("email").isEmail().withMessage("Email format is invalid"),
	body("username").notEmpty().withMessage("Username cannot be emptied"),
];
const emailValidations = [
	body("email").notEmpty().withMessage("Email cannot be emptied"),
	body("email").isEmail().withMessage("Email format is invalid"),
];

const passwordValidations = [
	body("password").notEmpty().withMessage("Password cannot be emptied")
	.matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'),
]

//POST
authRouter.post("/user-registration", validator(validations),registerController);
authRouter.post("/login", validator(emailValidations), loginController);
authRouter.post("/request-password-reset", validator(emailValidations), forgotPasswordController);
authRouter.post("/google-login", googleLoginController)
authRouter.post("/new-unverified-email", newUnverifiedEmailController);

// GET
authRouter.get("/keep-login", verifyToken, keepLoginController);

// PUT
authRouter.put("/email-verification", validator(passwordValidations), emailVerificationController);
authRouter.put("/verify-new-email", validator(passwordValidations), verifyNewEmailController);
authRouter.put("/reset-password",  resetPasswordController);





export {authRouter};