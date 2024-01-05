import { Router } from 'express';
import { registerController, emailVerificationController, loginController, keepLoginController, forgotPasswordController, resetPasswordController } from "../controllers/auth.controller";
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

//POST
authRouter.post("/user-registration", validator(validations),registerController);
authRouter.post("/login", loginController);
authRouter.post("/request-password-reset", forgotPasswordController);

// GET
authRouter.get("/keep-login", verifyToken, keepLoginController);

// PUT
authRouter.put("/email-verification", emailVerificationController);
authRouter.put("/reset-password", resetPasswordController);





export {authRouter};