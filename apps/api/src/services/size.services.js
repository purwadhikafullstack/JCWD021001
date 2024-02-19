import Stock from '../models/stock.model'
import { createSizeQuery, deleteSizeQuery } from '../queries/size.queries'

export const createSizeService = async (name, productCategoryId) => {
  try {
    const res = await createSizeQuery(name, productCategoryId)
    return res
  } catch (err) {
    throw err
  }
}

export const deleteSizeService = async (id) => {
  try {
    const checkStock = await Stock.findAll({
      where: {
        sizeId: id,
      },
    })
    if (checkStock.length > 0) {
      throw new Error('Stock have the size want to be deleted')
    }
    const res = await deleteSizeQuery(id)
    return res
  } catch (err) {
    throw err
  }
}
