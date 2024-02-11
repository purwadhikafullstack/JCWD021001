import { Op } from 'sequelize'
import StockJournal from '../models/stockJournal.model'
import Product from '../models/product.model'
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

export const getStockJournalQuery = async (
  warehouseId,
  stockId,
  startDate,
  endDate,
  page = null,
  pageSize = null,
) => {
  try {
    const offset = (page - 1) * pageSize
    const res = await StockJournal.findAndCountAll({
      where: {
        [Op.and]: [
          {
            warehouseId: warehouseId,
          },
          {
            stockId: stockId,
          },
          { createdAt: { [Op.gte]: new Date(startDate), [Op.lte]: new Date(endDate) } },
        ],
      },
      include: [
        {
          model: Product,
          as: 'product',
        },
      ],
      subQuery: false,
      limit: +pageSize,
      offset: offset,
    })
    return res
  } catch (err) {
    throw err
  }
}
