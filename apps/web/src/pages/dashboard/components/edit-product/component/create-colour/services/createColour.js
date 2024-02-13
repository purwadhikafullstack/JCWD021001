import axios from 'axios'
import { API_ROUTE } from '../../../../../../../services/route'

export const createProductColour = async (productId, colourId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.post(
      `${API_ROUTE}/prod-to-col`,
      { productId, colourId },
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
