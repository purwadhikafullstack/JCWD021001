import Product from '../models/product.model'
import {
  createProductCategoryQuery,
  deleteProductCategoryQuery,
  findProductCategoryByName,
  getGenderQuery,
  getProductCategoryQuery,
  updateProductCategoryQuery,
} from '../queries/productCategory.queries'

export const getProductCategoryService = async (gender) => {
  try {
    const res = await getProductCategoryQuery(gender)
    return res
  } catch (err) {
    throw err
  }
}

export const getGenderServices = async (name) => {
  try {
    const res = await getGenderQuery(name)
    return res
  } catch (err) {
    throw err
  }
}

export const createProductCategoryService = async (name, parentId) => {
  try {
    const check = await findProductCategoryByName({ name, parentId })
    if (check) throw new Error('Product Category with that name is already exist')
    const res = await createProductCategoryQuery(name, parentId)
    return res
  } catch (err) {
    throw err
  }
}

export const updateProductCategoryService = async (name, parentId, id) => {
  try {
    const res = await updateProductCategoryQuery(name, parentId, id)
    return res
  } catch (err) {
    throw err
  }
}

export const deleteProductCategoryService = async (id, parentId, grandParentId) => {
  try {
    const wait = await Product.findOne({
      where: {
        productCategoryId: id,
      },
    })
    if (wait) {
      await wait.update({
        productCategoryId: null,
      })
    } else {
      console.error('Record not found')
    }
    console.log('wait', wait)
    const res = await deleteProductCategoryQuery(id, parentId, grandParentId)
    return res
  } catch (err) {
    throw err
  }
}
