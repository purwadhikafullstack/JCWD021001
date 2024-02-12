import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const updateOrder = async (updateOrder) => {
  try {
    const response = await axios.patch(`${API_ROUTE}/order/${updateOrder?.orderId}`, {
      orderStatusId: updateOrder?.orderStatusId,
    })
  } catch (err) {
    console.error('Error updating cart:', err)
  }
}