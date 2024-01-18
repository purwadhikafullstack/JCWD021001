import { createProductQuery } from '../queries/product.queries'
import { createProductImageQuery } from '../queries/productImage.queries'

export const createProductImageService = async (imageUrl, productId) => {
  try {
    const res = await createProductImageQuery(imageUrl, productId)
    return res
  } catch (err) {
    throw err
  }
}
