import {
  createProductQuery,
  deleteProductQuery,
  getProductById,
  getProductByIdQuery,
  getProductByName,
  getProductQuery,
  updateProductQuery,
} from '../queries/product.queries'

export const getProductService = async (
  name,
  gender,
  group,
  category,
  id,
  sortBy,
  orderBy,
  page,
  pageSize,
) => {
  try {
    if (id) {
      const res = await getProductByIdQuery(id)
      return res
    }
    const res = await getProductQuery(
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

    return res
  } catch (err) {
    throw err
  }
}

export const createProductService = async (name, price, description, productCategoryId) => {
  try {
    const check = await getProductByName({ name, productCategoryId })
    console.log('name', name)
    if (check) throw new Error('Product with that name is already exist')

    const res = await createProductQuery(name, price, description, productCategoryId)
    return res
  } catch (err) {
    throw err
  }
}

export const updateProductService = async (name, price, description, productCategoryId, id) => {
  try {
    const check = await getProductQuery(id)

    if (!check) throw new Error('Product didnt exist')

    const res = await updateProductQuery(name, price, description, productCategoryId, id)
    return res
  } catch (err) {
    throw err
  }
}

export const deleteProductService = async (id) => {
  try {
    const check = await getProductQuery(id)
    if (!check) throw new Error('Product doesnt exist')
    const res = await deleteProductQuery(id)
    return res
  } catch (err) {
    throw err
  }
}
