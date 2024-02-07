import { createProdToColService } from '../services/prodToColServices'

export const createProdToColController = async (req, res) => {
  try {
    const { productId, colourId } = req.body
    const result = await createProdToColService(productId, colourId)
    return res.status(200).json({
      message: 'Create Product Colour Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err,
    })
  }
}
