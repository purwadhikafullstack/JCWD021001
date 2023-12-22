import Orders from "../models/orders.model";
import OrderProducts from "../models/orderProducts.model";
import Payments from "../models/payments.model";
import Product from "../models/product.model";
import User from '../models/user.model';

import { generateMidtransToken } from "../midtrans";

export const createOrderQuery = async (userId, userAddressId, warehouseId, totalPrice, totalQuantity, shippingCost, orderStatusId, productId, price, quantity) => {
    try {
        const order = await Orders.create({userId: userId, userAddressId: userAddressId, warehouseId: warehouseId, totalPrice: totalPrice, totalQuantity: totalQuantity, shippingCost: shippingCost, orderStatusId: orderStatusId});
        const orderProduct = await OrderProducts.create({ orderId: order.id, productId: productId, price, quantity: quantity })
        const product = await Product.findOne({ where: { id: productId } });
        const user = await User.findOne({ where: { id: userId } });
        const midtransToken = await generateMidtransToken(order.id, totalPrice, product.id, product.name, totalPrice, quantity, user.id, user.username, user.email);
        return { order, orderProduct, midtransToken}
    } catch (err) {
        throw err
    }
}