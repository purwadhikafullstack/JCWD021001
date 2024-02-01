import {
  createOrderService,
  getAllOrderByCategoryService,
  getAllOrderService,
  getOrderService,
} from '../services/orders.services'

const sendResponse = (res, statusCode, result, errorMessage) => {
  if (statusCode === 200) {
    return res.status(statusCode).json({
      message: 'success',
      data: result,
    })
  } else if (statusCode === 500) {
    return res.status(statusCode).json({
      message: 'error',
      error: errorMessage,
    })
  }
}

export const createOrderController = async (req, res) => {
  try {
    const {
      userId,
      userAddressId,
      warehouseId,
      totalPrice,
      totalQuantity,
      shippingCost,
      orderStatusId,
      products,
    } = req.body
    const result = await createOrderService(
      userId,
      userAddressId,
      warehouseId,
      totalPrice,
      totalQuantity,
      shippingCost,
      orderStatusId,
      products,
    )
    return sendResponse(res, 200, result, null)
  } catch (err) {
    console.log(err)
    return sendResponse(res, 500, null, err.message)
  }
}

// export const getOrderController = async (req, res) => {
//     try {
//         const { orderId } = req.params
//         const result = await getOrderService(orderId)
//         return sendResponse(res, 200, result, null);
//     } catch (err) {
//         console.log(err);
//         return sendResponse(res, 500, null, err.message);
//     }
// }

export const getOrderController = async (req, res) => {
  try {
    const { userId } = req.params
    const result = await getOrderService(userId)
    return sendResponse(res, 200, result, null)
  } catch (err) {
    console.log(err)
    return sendResponse(res, 500, null, err.message)
  }
}

export const getAllOrderController = async (req, res) => {
  try {
    const { sortBy, orderBy, page, pageSize, warehouseId, startDate, endDate } = req.query
    const result = await getAllOrderService(
      sortBy,
      orderBy,
      page,
      pageSize,
      warehouseId,
      startDate,
      endDate,
    )
    return res.status(200).json({
      message: 'Get All Order Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const getAllOrderByCategoryController = async (req, res) => {
  try {
    const { warehouseId, startDate, endDate } = req.query
    const result = await getAllOrderByCategoryService(warehouseId, startDate, endDate)
    return res.status(200).json({
      message: 'Get All Order Success',
      data: result[0],
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
