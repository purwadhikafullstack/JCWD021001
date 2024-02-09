import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const createProductCategory = async (name, parentId, toast) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.post(
      `${API_ROUTE}/product-category`,
      {
        name,
        parentId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    toast({
      title: `${res?.data?.title}`,
      status: 'success',
    })
    return res
  } catch (err) {
    toast({
      title: `${err?.message}`,
      status: 'error',
    })
  }
}
