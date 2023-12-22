import { createCartService, deleteCartService, getCartService, updateCartService } from "../services/carts.services";

export const createCartController = async (req, res) => {
    try {
        const { userId, productId, quantity, priceTotal } = req.body;
        const result = await createCartService(userId, productId, quantity, priceTotal);
        return res.status(200).json({
            message: "success",
            data: result,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message,
        });
    }
}

export const updateCartController = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { quantity } = req.body;
        const result = await updateCartService(cartId, quantity);
        return res.status(200).json({
            message: "success",
            data: result,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message,
        });
    }
}

export const deleteCartController = async (req, res) => {
    try {
        const { cartId } = req.params;
        const result = await deleteCartService(cartId);
        return res.status(200).json({
            message: "success",
            data: result,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message,
        }); 
    }
}

export const getCartController = async (req, res) => {
    try {
        const { userId } = req.params
        const result = await getCartService(userId)
        return res.status(200).json({
            message: "success",
            data: result,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: err.message,
        }); 
    }
}