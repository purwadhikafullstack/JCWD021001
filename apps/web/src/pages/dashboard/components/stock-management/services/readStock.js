import { API_ROUTE } from '../../../../../services/route'
import axios from 'axios'
export const getStock = async (warehouseId = 1, page = 1, pageSize = 10) => {
  try {
    const res = await axios.get(
      `${API_ROUTE}/stock?warehouseId=${warehouseId}&page=${page}&pageSize=${pageSize}`,
    )
    const stock = res?.data?.data
    return stock
  } catch (err) {
    throw err
  }
}
