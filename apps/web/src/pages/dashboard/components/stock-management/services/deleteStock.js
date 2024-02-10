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
    toast({
      title: `${err?.message}`,
      status: 'error',
    })
  }
}
