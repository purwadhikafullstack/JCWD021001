import {
  createStockService,
  getStockByIdService,
  getStockByProductIdService,
  getStockService,
} from '../services/stock.services'

export const getStockController = async (req, res) => {
  try {
    const { warehouseId } = req.query
    const result = await getStockService(warehouseId)
    return res.status(200).json({
      title: 'Get Stock Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      title: 'Get Stock Failed',
      message: err.message,
    })
  }
}

export const createStockController = async (req, res) => {
  try {
    const { productId, warehouseId, qty, sizeId, colourId } = req.body
    const result = await createStockService(productId, warehouseId, qty, sizeId, colourId)
    return res.status(200).json({
      title: 'Create Stock Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const getStockByIdController = async (req, res) => {
  try {
    const { id } = req.params
    const result = await getStockByIdService(id)
    return res.status(200).json({
      message: 'Get Stock By Id Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const getStockByProductIdController = async (req, res) => {
  try {
    const { productId, sizeId, colourId } = req.query
    const result = await getStockByProductIdService(productId, sizeId, colourId)
    return res.status(200).json({
      message: 'Get Stock Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
