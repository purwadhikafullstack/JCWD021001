import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const checkStock = async (productId, warehouseId, sizeId, colourId) => {
  try {
    console.log({ productId, warehouseId, sizeId, colourId })
    const res = await axios.get(
      `${API_ROUTE}stock/check/stock?productId=${productId}&warehouseId=${warehouseId}&sizeId=${sizeId}&colourId=${colourId}`,
    )
    console.log(res)
    return res
  } catch (err) {
    throw err
  }
}
