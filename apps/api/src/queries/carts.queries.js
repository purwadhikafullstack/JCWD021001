import { Sequelize } from 'sequelize';
import CartProducts from '../models/cartProducts.model';
import Carts from '../models/carts.model';
import Product from '../models/product.model';
import User from '../models/user.model';

export const createCartQuery = async (userId, productId, calcPrice, quantity) => {
    try {
        const existingCart = await Carts.findOne({ where: { userId: userId } });
        if (!existingCart) {
            const cart = await Carts.create({ userId: userId, totalPrice: calcPrice, totalQuantity: quantity });
            const cartProduct = await CartProducts.create({ productId: productId, cartId: cart.id, price: calcPrice, quantity: quantity });
            return { cart, cartProduct };
        } else {
            const updateCart =  await Carts.update(
                { totalPrice: Sequelize.literal(`totalPrice + ${calcPrice}`), 
                  totalQuantity: Sequelize.literal(`totalQuantity + ${quantity}`) },
                { where: { id: existingCart.id } }
            );
            const cartProduct = await CartProducts.create({ productId: productId, cartId: existingCart.id, price: calcPrice, quantity: quantity });
            return { cart: updateCart, cartProduct };
        }
    } catch (err) {
        throw err
    }
}

export const findCartQuery = async (cartProductId) => {
    try {
        const res = await CartProducts.findOne({
            include: [{model: Product}],
            where: { id: cartProductId }
        })
        return res;
    } catch (err) {
        throw err
    }
}

export const updateCartQuery = async (cartProductId, calcPrice, quantityDifference) => {
    try {
        const existingCartProduct = await CartProducts.findByPk(cartProductId);
        const updateCart= await Carts.update(
            { totalPrice: Sequelize.literal(`totalPrice + ${calcPrice}`), 
              totalQuantity: Sequelize.literal(`totalQuantity + ${quantityDifference}`) },
            { where: { id: existingCartProduct.cartId } }
        );

        const updatedCartProduct = await CartProducts.update(
            { price: Sequelize.literal(`price + ${calcPrice}`), 
              quantity: Sequelize.literal(`quantity + ${quantityDifference}`) },
            { where: { id: cartProductId } }
        );

        return { cart: updateCart, cartProduct: updatedCartProduct };
    } catch (error) {
        throw error;
    }
}

export const deleteCartQuery = async (cartProductId, cartId) => {
    try {
        const cartProduct = await CartProducts.destroy({
            where: { id: cartProductId }
        })
        const updatedCart = await Carts.findByPk(cartId, {
            include: [{ model: CartProducts, attributes: ['price', 'quantity'] }],
        });
        const totalPrice = updatedCart.CartProducts.reduce((sum, product) => sum + parseInt(product.price), 0);
        const totalQuantity = updatedCart.CartProducts.reduce((sum, product) => sum + product.quantity, 0);
 
        await Carts.update(
            { totalPrice: totalPrice, totalQuantity: totalQuantity },
            { where: { id: updatedCart.id } }
        );

        return {cart: updatedCart, cartProduct};
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