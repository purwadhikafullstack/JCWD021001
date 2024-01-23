import { Snap } from 'midtrans-client';
import Product from '../models/product.model';

const snap = new Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const generateMidtransToken = async (orderNumber, totalPrice, product, shippingCost, userId, userUsername, userEmail) => {
    try {
      
      const transaction_details = {
        order_id: orderNumber,
        gross_amount: totalPrice + shippingCost,
      };

      // Fetch product names from the Product table
    const productDetailsPromises = product.map(async (product) => {
      const productInfo = await Product.findOne({ where: { id: product.productId } })
      const price = parseFloat(product.priceProduct);
    
      return {
        id: product.productId,
        name: productInfo ? productInfo.name : 'Unknown Product',
        price: isNaN(price) ? 0 : price,
        quantity: product.quantity,
        shipping_cost: shippingCost
      };
    });

    const productDetails = await Promise.all(productDetailsPromises);
  
    const shippingItem = {
      id: 'shipping',
      name: 'Shipping Cost',
      price: shippingCost,
      quantity: 1,
    };

      const customer_details = {
        id: userId,
        first_name: userUsername,
        email: userEmail,
      }
  
  
      const transactionOptions = {
        transaction_details,
        item_details: [...productDetails, shippingItem],
        customer_details
      };
  ;

  
      const token = await snap.createTransactionToken(transactionOptions);
      return token;
    } catch (error) {
      throw error;
    }
  };