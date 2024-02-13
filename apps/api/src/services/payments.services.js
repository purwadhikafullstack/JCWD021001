import { createPaymentQuery } from "../queries/payments.queries";

export const createPaymentService = async (orderId, paymentCode, grossAmount, paymentDate, paymentMethod, paymentStatus, paymentMessage) => {
    try {
        const res = await createPaymentQuery(orderId, paymentCode, grossAmount, paymentDate, paymentMethod, paymentStatus, paymentMessage)
        return res
    } catch (err) {
        throw err
    }
}
