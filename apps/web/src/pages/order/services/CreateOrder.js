import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const createOrder = async ({
  userId,
  userAddressId,
  warehouseId,
  totalPrice,
  totalQuantity,
  shippingCost,
  orderStatusId,
  products,
}) => {
  try {
    const token = localStorage.getItem('token')
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(
      `${API_ROUTE}order`,
      {
        userId: userId,
        userAddressId: userAddressId,
        warehouseId: warehouseId,
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
        shippingCost: shippingCost,
        orderStatusId: orderStatusId,
        products: products,
      },
      config,
    )
    return response?.data?.data
  } catch (err) {
    throw err?.response?.data?.error
  }
}
