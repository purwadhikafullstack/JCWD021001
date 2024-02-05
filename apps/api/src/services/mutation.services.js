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

export const getMutationService = async (
  requesterWarehouseId,
  recipientWarehouseId,
  page,
  pageSize,
) => {
  try {
    const res = await getMutationQuery(requesterWarehouseId, recipientWarehouseId, page, pageSize)
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
    //Check its an manual or automatic mutation
    if (!isAccepted) {
      // Check recipient warehouse stock
      const recipientStock = await getStockByIdQuery(stockId)
      if (!recipientStock) {
        throw new Error('Sorry, stock doesnt exist')
      } else {
        if (recipientStock?.dataValues?.qty <= 0) throw new Error('Sorry, stock is empty')
      }

      // Creating mutation
      const recipientStockJournal = null // Recipient Stock Journal(the one who will send the stock)
      const receiverStockJournal = null // Requester Stock Journal(the one who will reveive the sended stock)
      const isAccepted = null // Default value is null, can be acc or reject
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

export const acceptMutationService = async (id, isAccepted) => {
  try {
    // Get mutation data
    let mutation = await getMutationQueryById(id)
    mutation = mutation?.dataValues

    // Check recipient warehouse stock

    const recipientStock = await getStockByIdQuery(mutation?.stockId)

    if (isAccepted === 0) {
      if (isAccepted) {
        if (recipientStock?.dataValues.qty <= 0) {
          throw new Error('Sorry, stock is empty')
        }
      }
      const res = await acceptMutationQuery(isAccepted, null, null, id)
      return res
    }

    // Check if requester have the stock

    const requester = await getSpesificStockQuery(
      recipientStock?.dataValues?.productId,
      mutation?.requesterWarehouseId,
      recipientStock?.dataValues?.sizeId,
      recipientStock?.dataValues?.colourId,
    )

    // If requester doesnt have the stock
    if (!requester) {
      // Create stock first
      const requesterStock = await createStockQuery(
        recipientStock?.productId,
        mutation?.requesterWarehouseId,
        0,
        recipientStock?.sizeId,
        recipientStock?.colourId,
      )

      // Increase the requester stock
      await requesterStock.increment('qty', { by: mutation?.qty })

      const requesterJournal = await createStockJournalQuery(
        recipientStock?.productId,
        mutation?.requesterWarehouseId,
        recipientStock?.sizeId,
        recipientStock?.colourId,
        1,
        mutation?.qty,
        requesterStock?.dataValues?.qty,
        requesterStock?.dataValues?.qty + mutation?.qty,
        requesterStock?.dataValues?.id,
        false,
      )

      await recipientStock.increment('qty', { by: -1 * mutation?.qty })

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
        isAccepted,
        recipientJournal?.dataValues?.id,
        requesterJournal?.dataValues?.id,
        id,
      )

      return res
    } else if (requester) {
      await requester.increment('qty', { by: mutation?.qty })

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
        isAccepted,
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
