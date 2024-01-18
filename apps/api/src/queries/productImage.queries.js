import ProductImage from '../models/productImage.model'

export const createProductImageQuery = async (imageUrl, productId) => {
  try {
    const res = await ProductImage.create({
      imageUrl,
      productId,
    })
    return res
  } catch (err) {
    throw err
  }
}
