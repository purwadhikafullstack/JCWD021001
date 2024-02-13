import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const checkStock = async (productId, warehouseId, sizeId, colourId) => {
  try {
    const res = await axios.get(`${API_ROUTE}stock/check/stock`, {
      productId,
      warehouseId,
      sizeId,
      colourId,
    })
    return res
  } catch (err) {
    throw err
  }
}
