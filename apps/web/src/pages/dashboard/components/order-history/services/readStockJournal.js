import { API_ROUTE } from '../../../../../services/route'
import axios from 'axios'
export const getStockJournals = async (
  warehouseId,
  stockId,
  startDate,
  endDate,
  page = 1,
  pageSize = 10,
) => {
  try {
    const token = localStorage.getItem('token')
    const stockJournals = await axios.get(
      `${API_ROUTE}/stock-journal/${warehouseId}/${stockId}?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return stockJournals?.data?.data
  } catch (err) {
    throw err
  }
}
