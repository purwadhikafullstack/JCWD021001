import { createMutationQuery } from '../queries/mutation.queries'
import {
  createStockQuery,
  getSpesificStockQuery,
  getStockByIdQuery,
} from '../queries/stock.queries'
import { createStockJournalQuery } from '../queries/stockJournal.queries'

export const createMutationService = async (
  requesterWarehouseId,
  recipientWarehouseId,
  qty,
  isAccepted,
  recipientStockId,
) => {
  try {
    //CHECK ITS AN MANUAL OR AUTOMATIC MUTATION
    if (!isAccepted) {
      // CHECK RECIPENT WAREHOUSE STOCK
      const recipientStock = await getStockByIdQuery(recipientStockId)
      if (!recipientStock) {
        throw new Error('Sorry, stock doesnt exist')
      } else {
        if (recipientStock?.dataValues?.qty <= 0) throw new Error('Sorry, stock is empty')
      }

      // CREATING MUTATION
      const recipientStockJournal = null
      const receiverStockJournal = null
      const isAccepted = false
      const res = await createMutationQuery(
        requesterWarehouseId,
        recipientWarehouseId,
        qty,
        recipientStockJournal,
        isAccepted,
        receiverStockJournal,
      )
      return res
    }
  } catch (err) {
    throw err
  }
}
