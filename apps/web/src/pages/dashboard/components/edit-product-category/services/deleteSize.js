import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const deleteSize = async (id, toast) => {
  try {
    const res = await axios.delete(`${API_ROUTE}size/${id}`)
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
