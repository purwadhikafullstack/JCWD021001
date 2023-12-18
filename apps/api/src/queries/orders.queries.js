import Orders from "../models/orders.model";

export const createOrderQuery = async (userId, warehouseId, totalAmount, shippingCost, orderStatusId) => {
    try {
        const res = await Orders.create({userId: userId, warehouseId: warehouseId, totalAmount: totalAmount, shippingCost: shippingCost, orderStatusId: orderStatusId})
        return res
    } catch (err) {
        throw err
    }
}