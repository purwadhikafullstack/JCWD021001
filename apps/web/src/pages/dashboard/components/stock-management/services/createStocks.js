import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const createStockJournal = async (
  productId,
  warehouseId,
  sizeId,
  colourId,
  qty,
  isUpdate,
  isAdding,
) => {
  try {
    const res = await axios.post(`${API_ROUTE}/stock-journal`, {
      productId,
      warehouseId,
      sizeId,
      colourId,
      qty,
      isUpdate,
      isAdding,
    })
    return res
  } catch (err) {
    throw err
  }
}
