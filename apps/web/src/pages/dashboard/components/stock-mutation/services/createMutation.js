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
    const token = localStorage.getItem('token')
    const res = await axios.post(
      `${API_ROUTE}/mutation`,
      {
        requesterWarehouseId,
        recipientWarehouseId,
        qty,
        isAccepted,
        stockId,
      },
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

export const approveMutation = async (mutationId, isAccepted) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.patch(
      `${API_ROUTE}/mutation/${mutationId}`,
      {
        isAccepted,
      },
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
