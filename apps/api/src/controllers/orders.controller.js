import { createOrderService, getOrderService } from "../services/orders.services";

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
export const getOrderController = async (req, res) => {
    try {
        const { orderId } = req.params
        const result = await getOrderService(orderId)
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}