import { createProductQuery } from '../queries/product.queries'
import { createProductImageQuery, deleteProductImageQuery } from '../queries/productImage.queries'

export const createProductImageService = async (imageUrl, productId) => {
  try {
    const res = await createProductImageQuery(imageUrl, productId)
    return res
  } catch (err) {
    throw err
  }
}

export const deleteProductImageService = async (id) => {
  try {
    const res = await deleteProductImageQuery(id)
    return res
  } catch (err) {
    throw err
  }
}
