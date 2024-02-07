import {
  createProductCategoryQuery,
  deleteProductCategoryQuery,
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
    const res = await deleteProductCategoryQuery(id, parentId, grandParentId)
    return res
  } catch (err) {
    throw err
  }
}
