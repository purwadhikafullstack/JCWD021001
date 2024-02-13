import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const editProductCategory = async (id, name, toast) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.patch(
      `${API_ROUTE}/product-category/${id}`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    toast({
      title: `${res?.data?.message}`,
      status: 'success',
      placement: 'bottom',
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
