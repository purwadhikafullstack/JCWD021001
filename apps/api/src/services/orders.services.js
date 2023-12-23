import { createOrderQuery } from "../queries/orders.queries";

export const createOrderService = async (userId, userAddressId, warehouseId, totalPrice, totalQuantity, shippingCost, orderStatusId, productId, price, quantity) => {
    try {
        const calcTotalPrice = price * quantity + shippingCost;
        if (calcTotalPrice != totalPrice) throw new Error("Total Price is wrong");
        const res = await createOrderQuery(userId, userAddressId, warehouseId, calcTotalPrice, totalQuantity, shippingCost, orderStatusId, productId, price, quantity)
        return res
    } catch (err) {
        throw err
    }
}