import { API_ROUTE } from '../../../../../services/route'
import axios from 'axios'

export const getMutations = async (
  requesterWarehouseId,
  isAccepted = 0,
  page = 1,
  pageSize = 10,
) => {
  try {
    const res = await axios.get(
      `${API_ROUTE}/mutation?requesterWarehouseId=${requesterWarehouseId}&isAccepted=${isAccepted}&page=${page}&pageSize=${pageSize}`,
    )
    const mutations = res?.data?.data
    return mutations
  } catch (err) {
    throw err
  }
}
