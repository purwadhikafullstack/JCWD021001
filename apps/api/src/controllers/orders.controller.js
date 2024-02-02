import { createOrderService, getOrderManagementService, getOrderService, getWarehouseService, updateOrderService } from "../services/orders.services";

const sendResponse = (res, statusCode, result, errorMessage) => {
    if (statusCode === 200) {
        return res.status(statusCode).json({
            message: 'success',
            data: result,
        });
    } else if (statusCode === 500) {
        return res.status(statusCode).json({
            message: 'error',
            error: errorMessage,
        });
    } 
};

export const createOrderController = async (req, res) => {
    try {
        const { userId, userAddressId, warehouseId, totalPrice, totalQuantity, shippingCost, orderStatusId, products } = req.body
        const result = await createOrderService(userId, userAddressId, warehouseId, totalPrice, totalQuantity, shippingCost, orderStatusId, products)
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const updateOrderController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { orderStatusId } = req.body
        const result = await updateOrderService(orderId, orderStatusId)
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const getOrderController = async (req, res) => {
    try {
        const { userId } = req.params
        const { orderNumber, orderDate, orderStatusId, page, pageSize } = req.query
        const result = await getOrderService(userId, orderNumber, orderDate, orderStatusId, page, pageSize)
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const getOrderManagementController = async (req, res) => {
    try {
        // const { userId } = req.params
        const { orderNumber, orderDate, warehouseId } = req.query
        const result = await getOrderManagementService(orderNumber, orderDate, warehouseId)
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const getWarehouseController = async (req, res) => {
    try {
        const result = await getWarehouseService()
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}