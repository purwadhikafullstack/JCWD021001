import axios from 'axios'
import { API_ROUTE } from '../../../../../../../services/route'

export const createProductColour = async (productId, colourId) => {
  try {
    const res = await axios.post(`${API_ROUTE}/prod-to-col`, { productId, colourId })
    return res
  } catch (err) {
    throw err
  }
}
