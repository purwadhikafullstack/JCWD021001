import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const getOrder = async (userId, orderNumber, orderDate, orderStatusId, page, pageSize) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        orderNumber: orderNumber,
        orderDate: orderDate,
        orderStatusId: orderStatusId,
        page: page,
        pageSize: pageSize,
      },
    }
    const response = await axios.get(`${API_ROUTE}order/${userId}`, config)
    return response?.data?.data
  } catch (err) {
    throw err?.response?.data?.error
  }
}
