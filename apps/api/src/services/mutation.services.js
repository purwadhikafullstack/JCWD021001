import {
  acceptMutationQuery,
  createMutationQuery,
  getMutationQuery,
  getMutationQueryById,
} from '../queries/mutation.queries'
import {
  createStockQuery,
  getSpesificStockQuery,
  getStockByIdQuery,
} from '../queries/stock.queries'
import { createStockJournalQuery } from '../queries/stockJournal.queries'

export const getMutationService = async (requesterWarehouseId, isAccepted, page, pageSize) => {
  try {
    const res = await getMutationQuery(requesterWarehouseId, isAccepted, page, pageSize)
    return res
  } catch (err) {
    throw err
  }
}

export const createMutationService = async (
  requesterWarehouseId,
  recipientWarehouseId,
  qty,
  isAccepted,
  stockId,
) => {
  try {
    //CHECK ITS AN MANUAL OR AUTOMATIC MUTATION
    if (!isAccepted) {
      // CHECK RECIPENT WAREHOUSE STOCK
      const recipientStock = await getStockByIdQuery(stockId)
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
        stockId,
      )
      return res
    }
  } catch (err) {
    throw err
  }
}

export const acceptMutationService = async (id) => {
  try {
    // GET MUTATION DATA
    let mutation = await getMutationQueryById(id)
    mutation = mutation?.dataValues

    // return mutation

    // CHECK RECIPIENT WAREHOUSE STOCK
    const recipientStock = await getStockByIdQuery(mutation?.stockId)
    if (recipientStock?.dataValues.qty <= 0) {
      throw new Error('Sorry, stock doesnt exist')
    } else {
      if (recipientStock?.dataValues?.qty <= 0) throw new Error('Sorry, stock is empty')
    }

    // return recipientStock

    // CHECK IF REQUESTER HAVE THE STOCK
    // return recipientStock
    const requester = await getSpesificStockQuery(
      recipientStock?.dataValues?.productId,
      mutation?.requesterWarehouseId,
      recipientStock?.dataValues?.sizeId,
      recipientStock?.dataValues?.colourId,
    )

    // return requester

    // IF REQUESTER DOESNT HAVE THE STOCKS
    if (!requester) {
      const requesterStock = await createStockQuery(
        recipientStock?.productId,
        mutation?.requesterWarehouseId,
        0,
        recipientStock?.sizeId,
        recipientStock?.colourId,
      )

      await requesterStock.increment('qty', { by: mutation?.qty })

      const isAdding = mutation?.qty > 0 ? 1 : 0

      const requesterJournal = await createStockJournalQuery(
        recipientStock?.productId,
        mutation?.requesterWarehouseId,
        recipientStock?.sizeId,
        recipientStock?.colourId,
        isAdding,
        mutation?.qty,
        requesterStock?.dataValues?.qty,
        requesterStock?.dataValues?.qty + mutation?.qty,
        requesterStock?.dataValues?.id,
        false,
      )

      await recipientStock?.increment('qty', { by: -1 * mutation?.qty })

      const recipientJournal = await createStockJournalQuery(
        recipientStock?.productId,
        mutation?.recipientWarehouseId,
        recipientStock?.sizeId,
        recipientStock?.colourId,
        0,
        -1 * mutation?.qty,
        recipientStock?.dataValues?.qty,
        recipientStock?.dataValues?.qty - mutation?.qty,
        recipientStock?.dataValues?.id,
        false,
      )

      const res = await acceptMutationQuery(
        1,
        recipientJournal?.dataValues?.id,
        requesterJournal?.dataValues?.id,
        id,
      )
      return res
    } else if (requester) {
      await requester.increment('qty', { by: mutation?.qty })

      // return requester

      const requesterJournal = await createStockJournalQuery(
        recipientStock?.dataValues?.productId,
        mutation?.requesterWarehouseId,
        recipientStock?.dataValues?.sizeId,
        recipientStock?.dataValues?.colourId,
        1,
        mutation?.qty,
        requester?.dataValues?.qty,
        requester?.dataValues?.qty + mutation?.qty,
        requester?.dataValues?.id,
        false,
      )

      await recipientStock?.increment('qty', { by: -1 * mutation?.qty })

      const recipientJournal = await createStockJournalQuery(
        recipientStock?.productId,
        mutation?.recipientWarehouseId,
        recipientStock?.sizeId,
        recipientStock?.colourId,
        0,
        mutation?.qty,
        recipientStock?.dataValues?.qty,
        recipientStock?.dataValues?.qty - mutation?.qty,
        recipientStock?.dataValues?.id,
        false,
      )

      const res = await acceptMutationQuery(
        1,
        recipientJournal?.dataValues?.id,
        requesterJournal?.dataValues?.id,
        id,
      )
      return res
    }
  } catch (err) {
    throw err
  }
}
