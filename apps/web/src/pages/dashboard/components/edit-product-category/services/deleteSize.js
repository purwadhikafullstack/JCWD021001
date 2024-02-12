import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const deleteSize = async (id, toast) => {
  try {
    const res = await axios.delete(`${API_ROUTE}size/${id}`)
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
