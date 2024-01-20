import { createStockQuery, getStockQuery } from '../queries/stock.queries'

export const getStockService = async (warehouseId) => {
  try {
    const res = await getStockQuery(warehouseId)
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
