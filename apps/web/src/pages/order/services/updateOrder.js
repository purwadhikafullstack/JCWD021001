import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const updateOrder = async (updateOrder) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.patch(
      `${API_ROUTE}order/${updateOrder?.orderId}`,
      {
        orderStatusId: updateOrder?.orderStatusId,
      },
      config,
    )
  } catch (err) {
    console.error('Error updating cart:', err)
  }
}
