import { Router } from 'express'
import {
    assignAdminWarehouseController,
  createWarehouseController,
  deleteWarehouseController,
  editWarehouseController,
  findUnassignedAdminController,
  findWarehouseAdminController,
  findWarehouseController,
  findWarehouseListController,
} from '../controllers/warehouse.controller'
const warehouseRouter = Router()

//GET
warehouseRouter.get('/', findWarehouseController)
warehouseRouter.get('/list', findWarehouseListController)
warehouseRouter.get('/admin/:id', findWarehouseAdminController)
warehouseRouter.get('/unassigned-admin', findUnassignedAdminController)

//PATCH
warehouseRouter.patch('/:id', editWarehouseController)
warehouseRouter.patch('/assign/:id', assignAdminWarehouseController)

//DELETE
warehouseRouter.delete('/:id', deleteWarehouseController)

//POST
warehouseRouter.post('/', createWarehouseController)

export { warehouseRouter }
