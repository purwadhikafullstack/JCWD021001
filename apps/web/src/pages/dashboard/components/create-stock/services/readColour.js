import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const getColours = async () => {
  try {
    const res = await axios.get(`${API_ROUTE}/colour`)
    const colour = res?.data?.data
    return colour
  } catch (err) {
    throw err
  }
}
