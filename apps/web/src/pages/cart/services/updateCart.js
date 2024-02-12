import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const updateCart = async (cartProductId, quantity, onCartUpdated) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const res = await axios.patch(
      `${API_ROUTE}cart/${cartProductId}`,
      {
        quantity: quantity,
      },
      config,
    )
    if (onCartUpdated) {
      onCartUpdated()
    }
  } catch (err) {
    throw err?.response?.data?.error
  }
}
