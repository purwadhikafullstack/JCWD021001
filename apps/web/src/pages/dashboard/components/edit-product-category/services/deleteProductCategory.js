import axios from 'axios'
import { API_ROUTE } from '../../../../../services/route'

export const deleteProductCategory = async (id, parentId, grandParentId = null, toast) => {
  const token = localStorage.getItem('token')
  try {
    const res = await axios.delete(`${API_ROUTE}product-category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        parentId: parentId,
        grandParentId: grandParentId,
      },
    })
    toast({
      title: `${res?.data?.message}`,
      status: 'success',
    })
  } catch (err) {
    let custom = ''
    if (
      err.response.data.message ===
      'Cannot delete or update a parent row: a foreign key constraint fails (`pure`.`stockjournals`, CONSTRAINT `stockjournals_ibfk_3` FOREIGN KEY (`sizeId`) REFERENCES `sizes` (`id`))'
    ) {
      custom = 'Stock with the category still exist'
    }
    const errorMessage =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'An unexpected error occurred'
    toast({
      title: `${custom || errorMessage}`,
      status: 'error',
    })
  }
}
