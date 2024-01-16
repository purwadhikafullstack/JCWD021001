import { getProductCategoryService } from '../services/productCategory.services'
export const getProductCategoryController = async (req, res) => {
  try {
    const { gender } = req.query
    const result = await getProductCategoryService(gender)
    return res.status(200).json({
      message: 'Get Product Category Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}
