import { Router } from 'express';
import { findMainUserAddressController } from '../controllers/userAddress.controller';
const userAddressRouter = Router();

// PATCH
userAddressRouter.get("/main-address/:id", findMainUserAddressController);

export {userAddressRouter};