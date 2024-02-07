import { API_ROUTE } from '../../../../../services/route'
import axios from 'axios'

export const getOrders = async (pageValue, warehouseId, startDate, endDate) => {
  try {
    const res = await axios.get(
      `${API_ROUTE}/order/sales/all?sortBy=orderDate&orderBy=DESC&page=${pageValue}&pageSize=10&warehouseId=${warehouseId}&startDate=${startDate}&endDate=${endDate}`,
    )
    const orders = res?.data?.data
    return orders
  } catch (err) {
    throw err
  }
}

export const getOrdersByCategory = async (warehouseId, startDate, endDate) => {
  try {
    const res = await axios.get(
      `${API_ROUTE}/order/sales/category?warehouseId=${warehouseId}&startDate=${startDate}&endDate=${endDate}`,
    )
    console.log('res', res)
    const orders = res?.data?.data
    return orders
  } catch (err) {
    throw err
  }
}

export const getOrdersByProduct = async (page, pageSize, warehouseId, startDate, endDate) => {
  try {
    const res = await axios.get(
      `${API_ROUTE}/order/sales/product?page=${page}&pageSize=${pageSize}&warehouseId=${warehouseId}&startDate=${startDate}&endDate=${endDate}`,
    )
    const orders = res?.data?.data
    return orders
  } catch (err) {
    throw err
  }
}
