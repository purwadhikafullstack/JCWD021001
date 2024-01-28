import { API_ROUTE } from '../../../../../services/route'
import axios from 'axios'

export const approveMutation = async (mutationId) => {
  try {
    const res = await axios.patch(`${API_ROUTE}/mutation/${mutationId}`)
    const isAccepted = res?.data
    return isAccepted
  } catch (err) {
    throw err
  }
}
