import { Router } from 'express';
import { registerController } from "../controllers/auth.controller.router";

const authRouter = Router();

//POST
authRouter.post("/register", registerController);

export {authRouter};