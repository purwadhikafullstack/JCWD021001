import { createMutationService } from '../services/mutation.services'

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
