import { createProductImageService } from '../services/productImage.services'

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
