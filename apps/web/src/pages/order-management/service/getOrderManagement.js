import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const getOrderManagement = async (
  orderNumber,
  orderDate,
  warehouseId,
  orderStatusId,
  page,
  pageSize,
) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        orderNumber: orderNumber,
        orderDate: orderDate,
        warehouseId: warehouseId,
        orderStatusId: orderStatusId,
        page: page,
        pageSize: pageSize,
      },
    };
    const response = await axios.get(`${API_ROUTE}order/management`, config)
    return response.data.data
  } catch (err) {
    alert('Error occurred')
  }
}
