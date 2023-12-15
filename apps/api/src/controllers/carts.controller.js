import { createCartService, deleteCartService, updateCartService } from "../services/carts.services";

export const createCartController = async (req, res) => {
    try {
        const { userId, productId, quantity, price } = req.body;
        const result = await createCartService(userId, productId, quantity, price);
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