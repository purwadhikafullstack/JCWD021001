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
} from '../controllers/userAddress.controller'
const userAddressRouter = Router()

// GET
userAddressRouter.get('/address/:id', findUserAddressController)
userAddressRouter.get('/province', findProvinceController)
userAddressRouter.get('/city/:id', findCityController)
userAddressRouter.get('/address', opencageController)
userAddressRouter.get('/city', findCityOpenCageBasedController)
userAddressRouter.get('/address-city', findOpencageAndCityController)
userAddressRouter.get('/', findSearchableCityController)
userAddressRouter.get('/province-list', findSearchableProvinceController)


//POST
userAddressRouter.post('/create-user-address', createUserAddressController)

//PATCH
userAddressRouter.patch('/update-user-address/:id', updateUserAddressController)
userAddressRouter.patch('/update-main-address', updateMainAddressController)

//DELETE
userAddressRouter.delete('/delete-user-address/:id', deleteUserAddressController)

export { userAddressRouter }
