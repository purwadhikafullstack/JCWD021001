import {
  createProductImageService,
  deleteProductImageService,
} from '../services/productImage.services'

export const createProductImageController = async (req, res) => {
  try {
    const { productId } = req.body
    const result = await createProductImageService(req.file.filename, productId)
    return res.status(200).json({
      title: 'Create Product Image Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      title: err.message,
    })
  }
}

export const deleteProductImageController = async (req, res) => {
  try {
    const { id, productId } = req.body
    const result = await deleteProductImageService(id, productId)
    return res.status(200).json({
      title: 'Delete Product Image Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      title: err.message,
    })
  }
}
