import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const productToStock = async (products, nearestWarehouse) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        products: products,
        nearestWarehouse: nearestWarehouse,
      },
    };
    const response = await axios.get(`${API_ROUTE}order/stock`, config)
    return response?.data?.data
  } catch (err) {
    throw err?.response?.data?.error
  }
}
