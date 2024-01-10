import Payments from "../models/payments.model";
import Orders from "../models/orders.model";

export const createPaymentQuery = async (orderId, paymentCode, grossAmount, paymentDate, paymentMethod, paymentStatus, paymentMessage) => {
    try {
        const res = await Payments.create({orderId, paymentCode, grossAmount, paymentDate, paymentMethod, paymentStatus, paymentMessage})
        if (res.paymentStatus === "settlement") {
            await Orders.update(
              { orderStatusId: 2},
              { where: { id: res.orderId } }
            );
          }
        return res
    } catch (err) {
        throw err
    }
}