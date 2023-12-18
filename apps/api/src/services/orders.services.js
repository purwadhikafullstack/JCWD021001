import { createOrderQuery } from "../queries/orders.queries";

export const createOrderService = async (userId, warehouseId, totalAmount, shippingCost, orderStatusId) => {
    try {
        const res = await createOrderQuery(userId, warehouseId, totalAmount, shippingCost, orderStatusId)
        return res
    } catch (err) {
        throw err
    }
}