import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const getCart = async (userId, stockData) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      params: {
        stockIds: stockData,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(`${API_ROUTE}cart/${userId}`, config)
    return response.data.data
  } catch (err) {
    alert('Error occurred')
  }
}
