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
    if (qty < 0) throw new Error('Qty cant be less than 0')
    const token = localStorage.getItem('token')
    const res = await axios.post(
      `${API_ROUTE}/stock-journal`,
      {
        productId,
        warehouseId,
        sizeId,
        colourId,
        qty,
        isUpdate,
        isAdding,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return res
  } catch (err) {
    throw err
  }
}
