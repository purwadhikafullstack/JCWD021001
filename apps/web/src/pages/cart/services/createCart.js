import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const createCart = async (items) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const res = await axios.post(
      `${API_ROUTE}cart`,
      {
        userId: items?.userId,
        productId: items?.productId,
        colourId: items?.colourId,
        sizeId: items?.sizeId,
        price: items?.price,
        quantity: items?.quantity,
      },
      config,
    )
    return res?.data?.message
  } catch (err) {
    throw err?.response?.data?.error
  }
}
