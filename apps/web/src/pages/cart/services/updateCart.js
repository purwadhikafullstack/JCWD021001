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
    const response = await axios.patch(
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
    console.error('Error updating cart:', err)
  }
}
