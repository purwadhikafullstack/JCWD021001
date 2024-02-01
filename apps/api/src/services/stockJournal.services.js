import { createStockQuery, getSpesificStockQuery } from '../queries/stock.queries'
import { createStockJournalQuery, getStockJournalQuery } from '../queries/stockJournal.queries'

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
  isUpdate,
) => {
  try {
    const check = await getSpesificStockQuery(productId, warehouseId, sizeId, colourId)
    if (check) {
      if (isUpdate) {
        if (qty < check.dataValues.qty) {
          const newQty = -1 * (check.dataValues.qty - qty)
          await check.increment('qty', { by: newQty })
          const res = await createStockJournalQuery(
            productId,
            warehouseId,
            sizeId,
            colourId,
            newQty > check.dataValues.qty ? 1 : 0,
            newQty,
            check.dataValues.qty,
            check.dataValues.qty + newQty,
            check.dataValues.id,
          )
          return res
        }
        const newQty = qty - check.dataValues.qty
        await check.increment('qty', { by: newQty })
        const res = await createStockJournalQuery(
          productId,
          warehouseId,
          sizeId,
          colourId,
          newQty > 0 ? 1 : 0,
          newQty,
          check.dataValues.qty,
          check.dataValues.qty + newQty,
          check.dataValues.id,
        )
        return res
      }
      await check.increment('qty', { by: -1 * qty })
      const res = await createStockJournalQuery(
        productId,
        warehouseId,
        sizeId,
        colourId,
        0,
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

export const getStockJournalService = async (warehouseId, stockId, page, pageSize) => {
  try {
    const res = await getStockJournalQuery(warehouseId, stockId, page, pageSize)
    return res
  } catch (err) {
    throw err
  }
}
