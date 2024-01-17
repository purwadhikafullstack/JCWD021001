import { getProductCategoryQuery } from '../queries/productCategory.queries'

export const getProductCategoryService = async (gender) => {
  try {
    const res = await getProductCategoryQuery(gender)
    return res
  } catch (err) {
    throw err
  }
}
