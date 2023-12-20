import { createOrderQuery } from "../queries/orders.queries";

export const createOrderService = async (userId, userAddressId, warehouseId, totalPrice, totalQuantity, shippingCost, orderStatusId, productId, price, quantity) => {
    try {
        const calcTotalPrice = price * quantity;
        const res = await createOrderQuery(userId, userAddressId, warehouseId, totalPrice, totalQuantity, shippingCost, orderStatusId, productId, price, quantity)
        return res
    } catch (err) {
        throw err
    }
}