import { size } from 'lodash'
import { createStockQuery, getSpesificStockQuery } from '../queries/stock.queries'
import { createStockJournalQuery } from '../queries/stockJournal.queries'

export const createStockJournalService = async (
  productId,
  warehouseId,
  sizeId,
  colourId,
  isAdding,
  qty,
  qtyBefore,
  qtyAfter,
  stockId,
) => {
  try {
    const check = await getSpesificStockQuery(productId, warehouseId, sizeId, colourId)
    if (check) {
      await check.increment('qty', { by: qty })
      const res = await createStockJournalQuery(
        productId,
        warehouseId,
        sizeId,
        colourId,
        qty > 0 ? 1 : 0,
        qty,
        check.dataValues.qty,
        check.dataValues.qty + qty,
        check.dataValues.id,
      )
      return res
    } else if (!check) {
      if (qty < 0) throw new Error('WAREHOUSE STOCK IS EMPTY')
      const createStocks = await createStockQuery(productId, warehouseId, 0, sizeId, colourId)
      await createStocks.increment('qty', { by: qty })
      const res = await createStockJournalQuery(
        productId,
        warehouseId,
        sizeId,
        colourId,
        qty > 0 ? 1 : 0,
        qty,
        createStocks.qty,
        createStocks.dataValues.qty + qty,
        createStocks.dataValues.id,
      )
      return res
    }
  } catch (err) {
    throw err
  }
}
