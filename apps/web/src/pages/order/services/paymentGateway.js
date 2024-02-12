import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const paymentGateway = async (dataPayment) => {
  try {
    const response = await axios.post(`${API_ROUTE}/payment`, {
      userId: dataPayment?.userId,
      orderId: dataPayment?.orderId,
      totalPrice: dataPayment?.totalPrice,
      shippingCost: dataPayment?.shippingCost,
      products: dataPayment?.products,
    })
    return response?.data?.data
  } catch (err) {
    alert('Error occurred')
  }
}
