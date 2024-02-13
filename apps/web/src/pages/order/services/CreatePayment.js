import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const createPayment = async (result, orderId) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(
      `${API_ROUTE}payment/result`,
      {
        orderId: orderId,
        paymentCode: result.transaction_id,
        grossAmount: result.gross_amount,
        paymentDate: result.transaction_time,
        paymentMethod: result.payment_type,
        paymentStatus: result.transaction_status,
        paymentMessage: result.status_message,
      },
      config,
    )
  } catch (err) {
    throw err?.response?.data?.error
  }
}
