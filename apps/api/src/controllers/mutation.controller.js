import {
  acceptMutationService,
  createMutationService,
  getMutationService,
} from '../services/mutation.services'

export const getMutationController = async (req, res) => {
  try {
    const { requesterWarehouseId, isAccepted, page, pageSize } = req.query
    const result = await getMutationService(requesterWarehouseId, isAccepted, page, pageSize)
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
    const result = await acceptMutationService(id)
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
