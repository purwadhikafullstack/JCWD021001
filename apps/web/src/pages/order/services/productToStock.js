import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const productToStock = async (products, nearestWarehouse) => {
  try {
    const response = await axios.get(`${API_ROUTE}/order/stock`, {
      params: {
        products: products,
        nearestWarehouse: nearestWarehouse,
      },
    })
    return response.data.data
  } catch (err) {
    alert('Error occurred')
  }
}
