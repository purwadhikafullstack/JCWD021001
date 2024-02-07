import { Router } from 'express'
import {
  findWarehouseAddressController,
  getShippingCostController,
  getWarehousesController,
} from '../controllers/warehouseAddress.controller'
const warehouseAddressRouter = Router()

//GET

warehouseAddressRouter.get('/nearest-warehouse', findWarehouseAddressController)
warehouseAddressRouter.get('/', getWarehousesController)

//POST
warehouseAddressRouter.post('/shipping-cost', getShippingCostController)

export {warehouseAddressRouter}
