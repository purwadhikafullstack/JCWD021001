import { getGenderQuery, getProductCategoryQuery } from '../queries/productCategory.queries'

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
