import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const deleteStock = async (id, toast) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.delete(`${API_ROUTE}/stock/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    toast({
      title: `${res?.data?.message}`,
      status: 'success',
      placement: 'bottom',
    })
    return res
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
