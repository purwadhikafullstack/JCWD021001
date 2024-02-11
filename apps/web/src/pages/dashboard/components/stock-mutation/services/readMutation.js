import { API_ROUTE } from '../../../../../services/route'
import axios from 'axios'

export const getMutations = async (
  requesterWarehouseId = '',
  recipientWarehouseId = '',
  page = 1,
  pageSize = 10,
) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(
      `${API_ROUTE}/mutation?requesterWarehouseId=${requesterWarehouseId}&recipientWarehouseId=${recipientWarehouseId}&page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    const mutations = res?.data?.data
    return mutations
  } catch (err) {
    throw err
  }
}
