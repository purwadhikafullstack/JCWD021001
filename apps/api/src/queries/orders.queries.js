import Orders from "../models/orders.model";
import OrderProducts from "../models/orderProducts.model";
import Payments from "../models/payments.model";


export const createOrderQuery = async (userId, userAddressId, warehouseId, priceTotal, shippingCost, orderStatusId, productId, quantity) => {
    try {
        console.log("price", priceTotal);
        const order = await Orders.create({userId: userId, userAddressId: userAddressId, warehouseId: warehouseId, totalPrice: priceTotal, shippingCost: shippingCost, orderStatusId: orderStatusId});
        const orderProduct = await OrderProducts.create({ orderId: order.id, productId: productId, quantity: quantity })
        return { order, orderProduct}
    } catch (err) {
        throw err
    }
}