import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const createStockJournal = async (
  productId,
  warehouseId,
  sizeId,
  colourId,
  qty,
  isUpdate,
) => {
  try {
    const token = localStorage.getItem('token')
    const stockJournal = await axios.post(
      `${API_ROUTE}stock-journal`,
      {
        productId,
        warehouseId,
        sizeId,
        colourId,
        qty,
        isUpdate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return stockJournal
  } catch (err) {
    throw err
  }
}
