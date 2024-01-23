import Payments from "../models/payments.model";
import Orders from "../models/orders.model";
import { generateMidtransToken } from "../midtrans";
import User from "../models/user.model";
import UserAddress from "../models/userAddress.model";
import Warehouse from "../models/warehouse.model";

export const createPaymentQuery = async (orderId, paymentCode, grossAmount, paymentDate, paymentMethod, paymentStatus, paymentMessage) => {
    try {
        const res = await Payments.create({orderId, paymentCode, grossAmount, paymentDate, paymentMethod, paymentStatus, paymentMessage})
        if (res.paymentStatus === "settlement") {
            await Orders.update(
              { orderStatusId: 2},
              { where: { id: orderId } }
            );
          }
        return res
    } catch (err) {
        throw err
    }
}

export const paymentGatewayQuery = async (userId, orderId, totalPrice, shippingCost, products) => {
  try {
    // console.log('dataPayment', [userId, orderId, totalPrice, shippingCost, products]);
    const user = await User.findOne({ where: { id: userId } });
     const midtransToken = await generateMidtransToken(
            orderId,
            totalPrice,
            products,
            shippingCost,
            user.id,
            user.username,
            user.email
          );
      return midtransToken;
  } catch (err) {
    throw err
  }
}

export const getPaymentQuery = async (userId) => {
  try {
    const res = await Orders.findAll({
      include: [{model: User}, {model: UserAddress}, {model: Warehouse}, {model: Payments}],
      where: { userId: userId },
    })
    return res;
  } catch (err) {
    throw err
  }
}