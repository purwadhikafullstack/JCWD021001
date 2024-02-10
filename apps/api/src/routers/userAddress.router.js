import { Router } from 'express'
import {
  findUserAddressController,
  createUserAddressController,
  findProvinceController,
  findCityController,
  opencageController,
  findCityOpenCageBasedController,
  findOpencageAndCityController,
  updateUserAddressController,
  updateMainAddressController,
  deleteUserAddressController,
  findSearchableCityController,
  findSearchableProvinceController,
  findMainAddressController,
} from '../controllers/userAddress.controller'
import { checkRoleSuperadmin, checkRoleAdmin, verifyToken } from '../middleware/auth.middleware'
import { validator } from '../middleware/validator.middleware';
import { body } from "express-validator";

const userAddressRouter = Router()

const addressValidation = [
    body('specificAddress', 'address is required').notEmpty(),
    body('cityId', 'city is required').notEmpty(),
    body('fullName', 'full name is required').notEmpty(),
    body('fullName', 'full name can only include letters, spaces, hyphens, or apostrophes')
      .matches(/^[A-Za-z\s\-']+$/),
    body('phoneNumber', 'phone number is required').notEmpty(),
    body('phoneNumber', 'phone number is not valid')
      .matches(/^\+?\d{1,3}[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}$/),
    body('postalCode', 'postal code is required').notEmpty(),
    body('postalCode', 'postal code is not valid').matches(/^\d{5}$/),
  ];

// GET
userAddressRouter.get('/address/:id', findUserAddressController)
userAddressRouter.get('/province', findProvinceController)
userAddressRouter.get('/city/:id', findCityController)
userAddressRouter.get('/address', opencageController)
userAddressRouter.get('/city', findCityOpenCageBasedController)
userAddressRouter.get('/address-city', findOpencageAndCityController)
userAddressRouter.get('/', findSearchableCityController)
userAddressRouter.get('/province-list', findSearchableProvinceController)
userAddressRouter.get('/main-address/:id', findMainAddressController)


//POST
userAddressRouter.post('/create-user-address', validator(addressValidation), verifyToken, createUserAddressController)

//PATCH
userAddressRouter.patch('/update-user-address/:id', validator(addressValidation), verifyToken, updateUserAddressController)
userAddressRouter.patch('/update-main-address', verifyToken, updateMainAddressController)

//DELETE
userAddressRouter.delete('/delete-user-address/:id', verifyToken, deleteUserAddressController)

export { userAddressRouter }
