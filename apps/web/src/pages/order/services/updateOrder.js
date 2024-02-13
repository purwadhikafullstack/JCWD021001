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
    const res = await axios.patch(
      `${API_ROUTE}order/${updateOrder?.orderId}`,
      {
        orderStatusId: updateOrder?.orderStatusId,
      },
      config,
    )
    return res?.data?.message
  } catch (err) {
    throw err?.response?.data?.error
  }
}
