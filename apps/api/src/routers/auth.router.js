import { Router } from 'express';
import { registerController } from "../controllers/auth.controller.router";
import { validator } from '../middleware/validator.middleware';
import { body } from "express-validator";
const authRouter = Router();

// VALIDATION USING EXPRESS VALIDATOR
const validations = [
	body("email").notEmpty().withMessage("Email cannot be emptied"),
	body("email").isEmail().withMessage("Email format is invalid"),
	body("username").notEmpty().withMessage("Username cannot be emptied"),
];

//POST
authRouter.post("/register", validator(validations),registerController);

export {authRouter};