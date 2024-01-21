import Product from '../models/product.model'
import Stock from '../models/stock.model'
import { Op } from 'sequelize'

export const getStockQuery = async (warehouseId) => {
  try {
    const filter = {}
    if (warehouseId)
      filter.where = {
        warehouseId: {
          [Op.eq]: warehouseId,
        },
      }
    const res = await Stock.findAll({
      include: [{ all: true }],
      ...filter,
    })
    return res
  } catch (err) {
    throw err
  }
}

export const createStockQuery = async (productId, warehouseId, qty, sizeId, colourId) => {
  try {
    const res = await Stock.create({ productId, warehouseId, qty, sizeId, colourId })
    return res
  } catch (err) {
    throw err
  }
}

export const getStockByIdQuery = async (id = null) => {
  try {
    const res = await Stock.findOne({
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

export const getSpesificStockQuery = async (
  productId = null,
  warehouseId = null,
  sizeId = null,
  colourId = null,
) => {
  try {
    const res = await Stock.findOne({
      where: {
        [Op.and]: [
          {
            productId: {
              [Op.eq]: productId,
            },
          },
          {
            warehouseId: {
              [Op.eq]: warehouseId,
            },
          },
          {
            sizeId: {
              [Op.eq]: sizeId,
            },
          },
          {
            colourId: {
              [Op.eq]: colourId,
            },
          },
        ],
      },
    })
    return res
  } catch (err) {
    throw err
  }
}
