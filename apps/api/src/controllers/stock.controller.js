import {
  createStockService,
  deleteStockService,
  getStockByIdService,
  getStockByProductIdService,
  getStockReportService,
  getStockService,
} from '../services/stock.services'

export const getStockController = async (req, res) => {
  try {
    const { warehouseId, name, page, pageSize } = req.query
    const result = await getStockService(warehouseId, name, page, pageSize)
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

export const deleteStockController = async (req, res) => {
  try {
    const { id } = req.params
    const result = await deleteStockService(id)
    return res.status(200).json({
      message: 'Delete Stock Success',
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

export const getStockReportController = async (req, res) => {
  try {
    const { warehouseId, page, pageSize, startDate, endDate } = req.query
    const result = await getStockReportService(warehouseId, page, pageSize, startDate, endDate)
    return res.status(200).json({
      message: 'Get Stock Report Success',
      data: result[0],
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
