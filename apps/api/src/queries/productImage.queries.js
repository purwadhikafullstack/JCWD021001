import { Op } from 'sequelize'
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

export const deleteProductImageQuery = async (id = null, productId = null) => {
  try {
    const filter = {}
    if (id)
      filter.where = {
        id: {
          [Op.eq]: id,
        },
      }
    if (productId)
      filter.where = {
        productId: {
          [Op.eq]: productId,
        },
      }
    const res = await ProductImage.destroy({
      ...filter,
    })
    return res
  } catch (err) {
    throw err
  }
}
