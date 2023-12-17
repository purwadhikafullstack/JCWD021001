import CartProducts from '../models/cartProducts.model';
import Carts from '../models/carts.model';
import Product from '../models/product.model';
import User from '../models/user.model';

export const createCartQuery = async (userId, productId, quantity, priceTotal) => {
    try {
        const cart = await Carts.create({ userId: userId, priceTotal: priceTotal })
        const cartProduct = await CartProducts.create({ productId: productId, cartId: cart.id, quantity: quantity })  
        return {cart, cartProduct}
    } catch (err) {
        throw err
    }
}

export const findCartQuery = async (cartId) => {
    try {
        const res = await CartProducts.findOne({
            include: [{model: Product}],
            where: { cartId: cartId }
        })
        return res;
    } catch (err) {
        throw err;
    }
}

export const updateCartQuery = async (cartId, quantity, totalPrice) => {
    try {
        const cart = await Carts.update(
            { priceTotal: totalPrice },
            { where: { id: cartId }},
        )
        const cartProduct = await CartProducts.update(
            { quantity: quantity },
            { where: { cartId: cartId }},
        )  
        return {cart, cartProduct}
    } catch (err) {
        throw err;
    }
}

export const deleteCartQuery = async (cartId) => {
    try {
        const cartProduct = await CartProducts.destroy({
            where: { cartId: cartId }
        })
        const cart = await Carts.destroy({
            where: { id: cartId }
        })
        return {cart, cartProduct};
    } catch (err) {
        throw err;
    }
}

export const findCartUserQuery = async (userId) => {
    try {
        const res = await Carts.findOne({
            where: { userId: userId }
        })
        return res;
    } catch (err) {
        throw err;
    }
}

export const getCartQuery = async (userId) => {
    try {
        const res = await Carts.findAll({
            include: [
                {model: User},
                {model: CartProducts, include: [{model: Product}]},
            ],
            where: { userId: userId }
        })
        return res
    } catch (err) {
        throw err
    }
}