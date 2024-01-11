import { getProductTypeQuery } from '../queries/productType.queries'

export const getProductTypeService = async (name) => {
  try {
    const res = await getProductTypeQuery(name)
    return res
  } catch (err) {
    throw err
  }
}
