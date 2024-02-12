import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const deleteColour = async (id, toast) => {
  try {
    const res = await axios.delete(`${API_ROUTE}colour/${id}`)
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
