import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const createSize = async (name, productCategoryId, toast) => {
  try {
    const res = await axios.post(`${API_ROUTE}/size`, {
      name,
      productCategoryId,
    })
    toast({
      title: `${res?.data?.message}`,
      status: 'success',
    })
  } catch (err) {
    toast({
      title: `${err?.message}`,
      status: 'error',
    })
  }
}
