import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const deleteColour = async (id, toast) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.delete(`${API_ROUTE}colour/${id}`, {
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
