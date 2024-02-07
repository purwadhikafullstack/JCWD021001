import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'
import { useToast } from '@chakra-ui/react'

export const deleteProductCategory = async (id, parentId, grandParentId = null, toast) => {
  try {
    const res = await axios.delete(`${API_ROUTE}/product-category/${id}`, {
      data: {
        parentId: parentId,
        grandParentId: grandParentId,
      },
    })
    console.log(id, parentId)
    console.log('res', res)
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
