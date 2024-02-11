import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const getOrder = async (orderNumber, orderDate, orderStatusId, page, pageSize) => {
  try {

    const response = await axios.get(`${API_ROUTE}/order/1`, {
      params: {
        orderNumber: orderNumber,
        orderDate: orderDate,
        orderStatusId: orderStatusId,
        page: page,
        pageSize: pageSize
      
      },
    })
    return response?.data?.data
  } catch (err) {
    alert('Error occurred')
  }
}
