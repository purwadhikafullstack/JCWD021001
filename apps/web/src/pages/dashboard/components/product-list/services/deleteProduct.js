import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const deleteProductImage = async (id, productId) => {
  try {
    await axios.delete(`${API_ROUTE}/product-image`, { data: { id, productId } })
  } catch (err) {
    throw err
  }
}

export const deleteProduct = async (id, productId, toast) => {
  const token = localStorage.getItem('token')
  try {
    await deleteProductImage('', productId)
    const res = await axios.delete(`${API_ROUTE}product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast({
      title: `${res?.data?.message}`,
      status: 'success',
      placement: 'bottom',
    })
  } catch (err) {
    toast({
      title: `${err?.message}`,
      status: 'error',
    })
  }
}
