import {
  acceptMutationService,
  createMutationService,
  getMutationService,
} from '../services/mutation.services'

export const getMutationController = async (req, res) => {
  try {
    const { requesterWarehouseId, recipientWarehouseId, page, pageSize } = req.query
    const result = await getMutationService(
      requesterWarehouseId,
      recipientWarehouseId,
      page,
      pageSize,
    )
    return res.status(200).json({
      message: 'Get Mutation Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const createMutationController = async (req, res) => {
  try {
    const { requesterWarehouseId, recipientWarehouseId, qty, isAccepted, stockId } = req.body
    console.log('sisi', requesterWarehouseId, recipientWarehouseId, qty, isAccepted, stockId)
    const result = await createMutationService(
      requesterWarehouseId,
      recipientWarehouseId,
      qty,
      isAccepted,
      stockId,
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
    const { id } = req.params
    const { isAccepted } = req.body
    const result = await acceptMutationService(id, isAccepted)
    return res.status(200).json({
      message: isAccepted == 1 ? 'Mutation Accepted' : 'Mutation Rejected',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
