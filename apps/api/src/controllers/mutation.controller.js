import { acceptMutationService, createMutationService } from '../services/mutation.services'

export const createMutationController = async (req, res) => {
  try {
    const { requesterWarehouseId, recipientWarehouseId, qty, isAccepted, recipientStockId } =
      req.body
    const result = await createMutationService(
      requesterWarehouseId,
      recipientWarehouseId,
      qty,
      isAccepted,
      recipientStockId,
    )
    return res.status(200).json({
      message: 'Create Mutation Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const acceptMutationController = async (req, res) => {
  try {
    const { isAccepted, stockJournalIdRecipient, stockJournalIdRequester, recipientStockId } =
      req.body
    const { id } = req.params
    console.log(isAccepted, stockJournalIdRecipient, stockJournalIdRequester, recipientStockId)
    const result = await acceptMutationService(
      isAccepted,
      stockJournalIdRecipient,
      stockJournalIdRequester,
      id,
    )
    return res.status(200).json({
      message: 'Mutation Accepted',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
