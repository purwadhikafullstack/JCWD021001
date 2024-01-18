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

export const deleteProductImageQuery = async (id) => {
  try {
    const res = await ProductImage.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    })
    return res
  } catch (err) {
    throw err
  }
}
