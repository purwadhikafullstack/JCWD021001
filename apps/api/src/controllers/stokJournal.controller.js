import { createStockJournalService } from '../services/stockJournal.services'

export const createStockJournalController = async (req, res) => {
  try {
    const {
      productId,
      warehouseId,
      sizeId,
      colourId,
      isAdding,
      qty,
      qtyBefore,
      qtyAfter,
      stockId,
    } = req.body
    const result = await createStockJournalService(
      productId,
      warehouseId,
      sizeId,
      colourId,
      isAdding,
      qty,
      qtyBefore,
      qtyAfter,
      stockId,
    )
    return res.status(200).json({
      message: 'Create Stock Journal Service Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
