import { createCartQuery, deleteCartQuery, findCartQuery, findCartUserQuery, getCartQuery, updateCartQuery } from "../queries/carts.queries";

export const createCartService = async (userId, productId, quantity, priceTotal) => {
    try {
        const calcTotalPrice = priceTotal * quantity;
        const res = await createCartQuery(userId, productId, quantity, calcTotalPrice);
        return res;
    } catch (err) {
        throw err;
    }
}

export const updateCartService = async (cartId, quantity) => {
    try {
        const check = await findCartQuery(cartId);
        if (!check) throw new Error("Data doesnt exist");
        const priceItems = check.Product.price || 0;
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

export const getCartService = async (userId) => {
    try {
        const check = await findCartUserQuery(userId);
        if (!check) throw new Error("Data doesnt exist");
        const res = await getCartQuery(userId)
        return res
    } catch (err) {
        throw err
    }
}