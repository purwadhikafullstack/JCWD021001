import { Router } from 'express';
import { findMainUserAddressController, createUserAddressController } from '../controllers/userAddress.controller';
const userAddressRouter = Router();

// PATCH
userAddressRouter.get("/main-address/:id", findMainUserAddressController);

//POST 
userAddressRouter.post("/create-user-address/:id", createUserAddressController);

export {userAddressRouter};