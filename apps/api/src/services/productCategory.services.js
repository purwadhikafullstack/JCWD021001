import {
  createProductCategoryQuery,
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

export const getGenderServices = async () => {
  try {
    const res = await getGenderQuery()
    return res
  } catch (err) {
    throw err
  }
}

export const createProductCategoryService = async (name, parentId) => {
  try {
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
