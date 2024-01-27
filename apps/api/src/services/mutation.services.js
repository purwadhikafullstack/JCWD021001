import {
  acceptMutationQuery,
  createMutationQuery,
  getMutationQueryById,
} from '../queries/mutation.queries'
import { getStockByIdQuery } from '../queries/stock.queries'

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

export const acceptMutationService = async (
  isAccepted,
  stockJournalIdRecipient,
  stockJournalIdRequester,
  id,
  recipientStockId,
) => {
  try {
    // GET MUTATION DATA
    let mutation = await getMutationQueryById(id)
    mutation = mutation?.dataValues

    // return mutation

    // CHECK RECIPIENT WAREHOUSE STOCK
    const recipientStock = await getStockByIdQuery(recipientStockId)
    if (!recipientStock) {
      throw new Error('Sorry, stock doesnt exist')
    } else {
      if (recipientStock?.dataValues?.qty <= 0) throw new Error('Sorry, stock is empty')
    }
    return recipientStock

    // CHECK IF REQUESTER HAVE THE STOCK
    const requester = await getSpesificStockQuery(
      recipientStock?.dataValues?.productId,
      recipientWarehouseId,
      recipientStock?.dataValues?.sizeId,
      recipientStock?.dataValues?.colourId,
    )

    // const res = await acceptMutationQuery(
    //   isAccepted,
    //   stockJournalIdRecipient,
    //   stockJournalIdRequester,
    //   id,
    // )
    // return res
  } catch (err) {
    throw err
  }
}
