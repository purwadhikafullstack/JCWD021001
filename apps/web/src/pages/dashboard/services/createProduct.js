import axios from 'axios'
import { API_ROUTE } from '../../../services/route'

export const createProduct = async (name, price, description, productCategoryId) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.post(
      `${API_ROUTE}product/create`,
      {
        name,
        price,
        description,
        productCategoryId,
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
