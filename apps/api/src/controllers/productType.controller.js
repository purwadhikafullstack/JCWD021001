import { getProductTypeService } from '../services/productType.services'

export const getProductTypeController = async (req, res) => {
  try {
    const { name } = req.query
    const result = await getProductTypeService(name)
    return res.status(200).json({
      message: 'Get Product Type Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
