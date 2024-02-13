import { createSizeQuery, deleteSizeQuery } from '../queries/size.queries'

export const createSizeService = async (name, productCategoryId) => {
  try {
    const res = await createSizeQuery(name, productCategoryId)
    return res
  } catch (err) {
    throw err
  }
}

export const deleteSizeService = async (id) => {
  try {
    const res = await deleteSizeQuery(id)
    return res
  } catch (err) {
    throw err
  }
}
