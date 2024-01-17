import {
  createProductQuery,
  deleteProductQuery,
  getProductByName,
  getProductQuery,
  updateProductQuery,
} from '../queries/product.queries'

export const getProductService = async (name, gender, group, category, id, sortBy, orderBy) => {
  try {
    const res = await getProductQuery(name, gender, group, category, id, sortBy, orderBy)
    return res
  } catch (err) {
    throw err
  }
}

export const createProductService = async (name, price, description, productCategoryId) => {
  try {
    const check = await getProductByName(name)

    if (check) throw new Error('Product with that name is already exist')

    const res = await createProductQuery(name, price, description, productCategoryId)
    return res
  } catch (err) {
    throw err
  }
}

export const updateProductService = async (
  name,
  price,
  description,
  productGroupId,
  productTypeId,
  productCategoryId,
  colourId,
  id,
) => {
  try {
    const check = await getProductQuery(id)

    if (!check) throw new Error('Product didnt exist')

    if (check) console.log('check', check)

    const res = await updateProductQuery(
      name,
      price,
      description,
      productGroupId,
      productTypeId,
      productCategoryId,
      colourId,
      id,
    )
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
