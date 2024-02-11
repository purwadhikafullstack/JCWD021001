import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const getWarehouses = async (warehouseId = null) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`${API_ROUTE}/warehouse-address?warehouseId=${warehouseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const warehouses = res?.data?.data
    return warehouses
  } catch (err) {
    throw err
  }
}

