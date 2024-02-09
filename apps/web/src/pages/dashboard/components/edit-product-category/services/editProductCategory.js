import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const editProductCategory = async (id, name, toast) => {
  try {
    const res = await axios.patch(`${API_ROUTE}/product-category/${id}`, {
      name,
    })
    toast({
      title: `${res?.data?.title}`,
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
