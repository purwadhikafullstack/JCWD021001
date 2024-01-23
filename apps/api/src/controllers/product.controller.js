import {
  createProductService,
  deleteProductService,
  getProductService,
  updateProductService,
} from '../services/product.services'

export const getProductController = async (req, res) => {
  try {
    const { name, gender, group, category, sortBy, orderBy, page, pageSize } = req.query
    const { id } = req.params
    const result = await getProductService(
      name,
      gender,
      group,
      category,
      id,
      sortBy,
      orderBy,
      page,
      pageSize,
    )
    return res.status(200).json({
      message: 'Get Product Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const createProductController = async (req, res) => {
  try {
    const { name, price, description, productCategoryId } = req.body

    const result = await createProductService(name, price, description, productCategoryId)
    return res.status(200).json({
      message: 'Create Product Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      tittle: 'Create Product Failed',
      message: err.message,
    })
  }
}

export const updateProductController = async (req, res) => {
  try {
    const { name, price, description, productCategoryId } = req.body
    const { id } = req.params
    const result = await updateProductService(name, price, description, productCategoryId, id)
    return res.status(201).json({
      title: 'Update Product Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      title: 'Update Product Failed',
      message: err.message,
    })
  }
}

export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params
    const result = await deleteProductService(id)
    return res.status(200).json({
      title: 'Delete Product Success',
      data: result,
    })
  } catch (err) {
    return res.status(500).json({
      title: 'Delete Product Failed',
      message: err.message,
    })
  }
}
