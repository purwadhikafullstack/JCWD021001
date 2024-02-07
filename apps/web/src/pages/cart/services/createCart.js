import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const createCart = async (items) => {
  try {
    const response = await axios.post(`${API_ROUTE}/cart`, {
      userId: items?.userId,
      productId: items?.productId,
      colourId: items?.colourId,
      sizeId: items?.sizeId,
      price: items?.price,
      quantity: items?.quantity,
    })
  } catch (err) {
    throw err
  }
}
