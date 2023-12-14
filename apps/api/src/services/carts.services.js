import { createCartQuery, deleteCartQuery, findCartQuery, updateCartQuery } from "../queries/carts.queries";


export const createCartService = async (userId, productId, quantity, price) => {
    try {
        const res = await createCartQuery(userId, productId, quantity, price);
        return res;
    } catch (err) {
        throw err;
    }
}

export const updateCartService = async (cartId, quantity) => {
    try {
        const check = await findCartQuery(cartId);
        if (!check) throw new Error("Data doesnt exist");
        const priceItems = check.price || 0;
        const totalPrice = priceItems * quantity;
        const res = await updateCartQuery(cartId, quantity, totalPrice);
        return res;
    } catch (err) {
        throw err;
    }
}

export const deleteCartService = async (cartId) => {
    try {
        const check = await findCartQuery(cartId);
        if (!check) throw new Error("Data doesnt exist");
        const res = await deleteCartQuery(cartId);
        return res;
    } catch (err) {
        throw err;
    }
}