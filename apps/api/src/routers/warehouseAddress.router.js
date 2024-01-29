import { Router } from "express";
import { findWarehouseAddressController, getShippingCostController } from "../controllers/warehouseAddress.controller";
const warehouseAddressRouter = Router();

//GET

warehouseAddressRouter.get('/nearest-warehouse', findWarehouseAddressController)

//POST
warehouseAddressRouter.post('/shipping-cost', getShippingCostController)

export {warehouseAddressRouter}