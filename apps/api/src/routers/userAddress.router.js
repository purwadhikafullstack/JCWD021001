import { Router } from 'express';
import { findMainUserAddressController, createUserAddressController, findProvinceController, findCityController, opencageController, findCityOpenCageBasedController, findOpencageAndCityController } from '../controllers/userAddress.controller';
const userAddressRouter = Router();

// GET
userAddressRouter.get("/main-address/:id", findMainUserAddressController);
userAddressRouter.get("/province", findProvinceController);
userAddressRouter.get("/city/:id", findCityController);
userAddressRouter.get("/address", opencageController);
userAddressRouter.get("/city", findCityOpenCageBasedController);
userAddressRouter.get("/address-city", findOpencageAndCityController);


//POST 
userAddressRouter.post("/create-user-address/:id", createUserAddressController);

export {userAddressRouter};