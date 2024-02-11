import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const deleteProductCategory = async (id, parentId, grandParentId = null, toast) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.delete(`${API_ROUTE}/product-category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        parentId: parentId,
        grandParentId: grandParentId,
      },
    })
    toast({
      title: `${res?.data?.title}`,
      status: 'success',
    })
  } catch (err) {
    toast({
      title: `${err?.message}`,
      status: 'error',
    })
  }
}
