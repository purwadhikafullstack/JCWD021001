import { createOrderQuery } from "../queries/orders.queries";

const calcTotalPrice = (products) => {
    return products.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);
};

export const createOrderService = async (userId, userAddressId, warehouseId, totalPrice, totalQuantity, shippingCost, orderStatusId, products) => {
    try {
        const newTotalPrice = calcTotalPrice(products);
        const totalPriceWithShipping = newTotalPrice + shippingCost;
        if (newTotalPrice != totalPrice) throw new Error("Total Price is wrong");
        const res = await createOrderQuery(userId, userAddressId, warehouseId, newTotalPrice, totalQuantity, shippingCost, orderStatusId, products)
        return res
    } catch (err) {
        throw err
    }
}