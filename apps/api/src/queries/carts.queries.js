import Carts from '../models/carts.model';

export const createCartQuery = async (userId, productId, quantity, price) => {
    try {
        const res = await Carts.create({userId, productId, quantity, price});
        return res;
    } catch (err) {
        throw err;
    }
}

export const findCartQuery = async (cartId) => {
    try {
        const res = await Carts.findOne({
            where: {
                id: cartId,
            }
        })
        return res;
    } catch (err) {
        throw err;
    }
}

export const updateCartQuery = async (cartId, quantity, totalPrice) => {
    try {
        const res = await Carts.update(
            { quantity: quantity, price: totalPrice},
            { where: { id: cartId }},
        )
        return res;
    } catch (err) {
        throw err;
    }
}

export const deleteCartQuery = async (cartId) => {
    try {
        const res = await Carts.destroy({
            where: {
                id: cartId,
            }
        })
        return res;
    } catch (err) {
        throw err;
    }
}

// export const restoreCartQuery = async (cartId) => {
//     try {
//         const res = await Carts.restore({
//             where: {
//                 id: cartId
//             }
//         });
//         return res;
//     } catch (err) {
//         throw err;
//     }
// };