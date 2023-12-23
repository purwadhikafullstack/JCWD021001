import { Snap } from 'midtrans-client';

const snap = new Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const generateMidtransToken = async (orderId, totalPrice, productId, productName, productPrice, quantity, userId, userUsername, userEmail) => {
    try {
      const transaction_details = {
        order_id: orderId,
        gross_amount: totalPrice,
      };
  
      const item_details = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: quantity,
      }

      const customer_details = {
        id: userId,
        name: userUsername,
        email: userEmail,
      }
  
      const transactionOptions = {
        transaction_details,
        item_details,
        customer_details
      };
  
      const token = await snap.createTransactionToken(transactionOptions);
      return token;
    } catch (error) {
      throw error;
    }
  };