import { Router } from 'express';
import { registerController, emailVerificationController, loginController, keepLoginController } from "../controllers/auth.controller";
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

//POST USER REGISTRATION
authRouter.post("/user-registration", validator(validations),registerController);

// SET PASSWORD AND VERIFY EMAIL
authRouter.put("/email-verification", emailVerificationController);

// LOGIN
authRouter.post("/login", loginController);

// KEEP LOGIN
authRouter.get("/keep-login", verifyToken, keepLoginController);

export {authRouter};