import { API_ROUTE } from '../../../../../services/route'
import axios from 'axios'

export const createMutation = async (
  requesterWarehouseId,
  recipientWarehouseId,
  qty,
  isAccepted,
  stockId,
) => {
  try {
    const res = await axios.post(`${API_ROUTE}/mutation`, {
      requesterWarehouseId,
      recipientWarehouseId,
      qty,
      isAccepted,
      stockId,
    })
    console.log('response-create-mutation', res)
    const mutation = res?.data
    return mutation
  } catch (err) {
    throw err
  }
}

export const approveMutation = async (mutationId) => {
  try {
    const res = await axios.patch(`${API_ROUTE}/mutation/${mutationId}`)
    const isAccepted = res?.data
    return isAccepted
  } catch (err) {
    throw err
  }
}
