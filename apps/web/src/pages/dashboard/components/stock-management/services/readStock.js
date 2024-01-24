import { API_ROUTE } from '../../../../../services/route'
import axios from 'axios'
export const getStock = async (warehouseId = 1) => {
  try {
    const res = await axios.get(`${API_ROUTE}/stock?warehouseId=${warehouseId}`)
    const stock = res?.data?.data
    return stock
  } catch (err) {
    throw err
  }
}
