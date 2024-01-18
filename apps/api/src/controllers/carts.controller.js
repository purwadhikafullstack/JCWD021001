import { createCartService, deleteCartService, getCartService, updateCartService } from "../services/carts.services";

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

export const createCartController = async (req, res) => {
    try {
        const { userId, stockId, price, quantity } = req.body;
        const result = await createCartService(userId, stockId, price, quantity);
        return res.status(200).json({
            message: "success",
            data: result,
        })
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
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const deleteCartController = async (req, res) => {
    try {
        const { cartProductIds } = req.body;
        const result = await deleteCartService(cartProductIds);
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

export const getCartController = async (req, res) => {
    try {
        const { userId } = req.params
        const result = await getCartService(userId)
        return sendResponse(res, 200, result, null);
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, null, err.message);
    }
}

