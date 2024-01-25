import { Op } from 'sequelize'
import StockJournal from '../models/stockJournal.model'

export const createStockJournalQuery = async (
  productId,
  warehouseId,
  sizeId,
  colourId,
  isAdding,
  qty,
  qtyBefore,
  qtyAfter,
  stockId,
  isUpdate = false,
) => {
  try {
    const res = await StockJournal.create({
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
    })
    return res
  } catch (err) {
    throw err
  }
}

export const getStockJournalQuery = async (warehouseId, stockId) => {
  try {
    const res = await StockJournal.findAndCountAll({
      where: {
        [Op.and]: [
          {
            warehouseId: warehouseId,
          },
          {
            stockId: stockId,
          },
        ],
      },
    })
    return res
  } catch (err) {
    throw err
  }
}
