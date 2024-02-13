import { createCartService, deleteCartService, getCartService, updateCartService } from "../services/carts.services";

const sendResponse = (res, statusCode, result, errorMessage, customMessage) => {
    if (statusCode === 200) {
        return res.status(statusCode).json({
            message: customMessage,
            data: result,
        });
    } else if (statusCode === 500) {
        return res.status(statusCode).json({
            message: 'error',
            error: errorMessage,
        });
    } 
};

export const createCartController = async (req, res) => {
    try {
        const { userId, productId, colourId, sizeId, price, quantity } = req.body;
        const result = await createCartService(userId, productId, colourId, sizeId, price, quantity);
        return sendResponse(res, 200, result, null, 'Cart created successfully');
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const updateCartController = async (req, res) => {
    try {
        const { cartProductId } = req.params;
        const { quantity } = req.body;
        const result = await updateCartService(cartProductId, quantity);
        return sendResponse(res, 200, result, null, 'Cart updated successfully');
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const deleteCartController = async (req, res) => {
    try {
        const { cartProductIds } = req.body;
        const result = await deleteCartService(cartProductIds);
        return sendResponse(res, 200, result, null, 'Cart deleted successfully');
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const getCartController = async (req, res) => {
    try {
        const { userId } = req.params
        const { stockIds } = req.query
        const result = await getCartService(userId, stockIds)
        return sendResponse(res, 200, result, null, 'Cart retrieved successfully');
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

