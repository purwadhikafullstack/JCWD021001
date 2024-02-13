import { createSizeService, deleteSizeService } from '../services/size.services'

export const createSizeController = async (req, res) => {
  try {
    const { name, productCategoryId } = req.body
    const result = await createSizeService(name, productCategoryId)
    return res.status(200).json({
      message: 'Create Size Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
    })
  }
}

export const deleteSizeController = async (req, res) => {
  try {
    const { id } = req.params
    const result = await deleteSizeService(id)

    return res.status(200).json({
      message: 'Delete Size Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err?.message,
    })
  }
}
