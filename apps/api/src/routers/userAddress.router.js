import { Router } from 'express';
import { findUserAddressController, createUserAddressController, findProvinceController, findCityController, opencageController, findCityOpenCageBasedController, findOpencageAndCityController } from '../controllers/userAddress.controller';
const userAddressRouter = Router();

// GET
userAddressRouter.get("/address/:id", findUserAddressController);
userAddressRouter.get("/province", findProvinceController);
userAddressRouter.get("/city/:id", findCityController);
userAddressRouter.get("/address", opencageController);
userAddressRouter.get("/city", findCityOpenCageBasedController);
userAddressRouter.get("/address-city", findOpencageAndCityController);


//POST 
userAddressRouter.post("/create-user-address/:id", createUserAddressController);

export {userAddressRouter};