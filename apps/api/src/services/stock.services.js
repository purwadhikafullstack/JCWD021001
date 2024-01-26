import {
  createStockQuery,
  getStockByIdQuery,
  getStockByProductIdQuery,
  getStockQuery,
} from '../queries/stock.queries'

export const getStockService = async (warehouseId, page, pageSize) => {
  try {
    const res = await getStockQuery(warehouseId, page, pageSize)
    return res
  } catch (err) {
    throw err
  }
}

export const createStockService = async (productId, warehouseId, qty, sizeId, colourId) => {
  try {
    const res = await createStockQuery(productId, warehouseId, qty, sizeId, colourId)
    return res
  } catch (err) {
    throw err
  }
}

export const getStockByIdService = async (id) => {
  try {
    const res = await getStockByIdQuery(id)
    return res
  } catch (err) {
    throw err
  }
}

export const getStockByProductIdService = async (productId, sizeId, colourId) => {
  try {
    const res = await getStockByProductIdQuery(productId, sizeId, colourId)
    console.log('RES', res)
    return res
  } catch (err) {
    throw err
  }
}
