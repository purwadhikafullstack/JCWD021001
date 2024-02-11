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

import { checkRoleSuperadmin, checkRoleAdmin, verifyToken } from '../middleware/auth.middleware'

const warehouseRouter = Router()

//GET
warehouseRouter.get('/' , verifyToken, checkRoleSuperadmin, findWarehouseController)
warehouseRouter.get('/list', verifyToken, checkRoleSuperadmin, findWarehouseListController)
warehouseRouter.get('/admin/:id', verifyToken, checkRoleSuperadmin, findWarehouseAdminController)
warehouseRouter.get('/unassigned-admin', verifyToken, checkRoleSuperadmin, findUnassignedAdminController)

//PATCH
warehouseRouter.patch('/:id', verifyToken, checkRoleSuperadmin, editWarehouseController)
warehouseRouter.patch('/assign/:id', verifyToken, checkRoleSuperadmin, assignAdminWarehouseController)

//DELETE
warehouseRouter.delete('/:id', verifyToken, checkRoleSuperadmin,  deleteWarehouseController)

//POST
warehouseRouter.post('/', verifyToken, checkRoleSuperadmin, createWarehouseController)

export { warehouseRouter }
