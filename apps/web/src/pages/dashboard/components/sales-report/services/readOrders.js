import { API_ROUTE } from '../../../../../services/route'
import axios from 'axios'

export const getOrders = async (pageValue, startDate, endDate) => {
  try {
    const res = await axios.get(
      `${API_ROUTE}/order?sortBy=orderDate&orderBy=DESC&page=${pageValue}&pageSize=10&startDate=${startDate}&endDate=${endDate}`,
    )
    const orders = res?.data?.data
    return orders
  } catch (err) {
    throw err
  }
}
