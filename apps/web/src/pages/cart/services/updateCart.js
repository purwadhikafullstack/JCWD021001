import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const updateCart = async (cartProductId, quantity, onCartUpdated) => {
  try {
    const response = await axios.patch(`${API_ROUTE}/cart/${cartProductId}`, {
      quantity: quantity,
    })
    if (onCartUpdated) {
      onCartUpdated()
    }
  } catch (err) {
    console.error('Error updating cart:', err)
  }
}

 
