import { getProductCategoryQuery } from '../queries/productCategory.queries'

export const getProductCategoryService = async () => {
  try {
    const res = await getProductCategoryQuery()
    return res
  } catch (err) {
    throw err
  }
}
