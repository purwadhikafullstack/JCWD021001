import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const getOrderDetail = async (orderId) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`${API_ROUTE}order/detail/${orderId}`, config)
    return response?.data?.data
  } catch (err) {
    throw err?.response?.data?.error
  }
}