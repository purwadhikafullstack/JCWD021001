import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const deleteProductCategory = async (id, parentId, grandParentId = null, toast) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.delete(`${API_ROUTE}product-category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        parentId: parentId,
        grandParentId: grandParentId,
      },
    })
    toast({
      title: `${res?.data?.message}`,
      status: 'success',
    })
  } catch (err) {
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast({
      title: `${errorMessage}`,
      status: 'error',
    })
  }
}
