import { createPaymentQuery, paymentGatewayQuery } from "../queries/payments.queries";

export const createPaymentService = async (orderId, paymentCode, grossAmount, paymentDate, paymentMethod, paymentStatus, paymentMessage) => {
    try {
        const res = await createPaymentQuery(orderId, paymentCode, grossAmount, paymentDate, paymentMethod, paymentStatus, paymentMessage)
        return res
    } catch (err) {
        throw err
    }
}

export const paymentGatewayService = async (userId, orderId, totalPrice, shippingCost, products) => {
    try {
        const res = await paymentGatewayQuery(userId, orderId, totalPrice, shippingCost, products);
        return res;
    } catch (err) {
        throw err
    }
}