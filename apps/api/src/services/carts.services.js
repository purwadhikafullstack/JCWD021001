import {
  createCartQuery,
  deleteCartQuery,
  findCartQuery,
  findCartStockQuery,
  findCartUserQuery,
  getCartQuery,
  updateCartQuery,
} from '../queries/carts.queries'

export const createCartService = async (userId, productId, colourId, sizeId, price, quantity) => {
  try {
    const existingCartProduct = await findCartStockQuery(userId, productId, colourId, sizeId)
    if (existingCartProduct) throw new Error('The product is already in the cart')
    const calcPrice = price * quantity
    const res = await createCartQuery(userId, productId, colourId, sizeId, calcPrice, quantity)
    return res
  } catch (err) {
    throw err
  }
}

export const updateCartService = async (cartProductId, quantity) => {
  try {
    const existingCartProduct = await findCartQuery(cartProductId)
    if (!existingCartProduct) throw new Error('Cart product not found')

    const productPrice = existingCartProduct?.product?.price || 0
    const quantityDifference = quantity - existingCartProduct?.quantity
    const calcPrice = productPrice * quantityDifference

    const updatedCartProduct = await updateCartQuery(cartProductId, calcPrice, quantityDifference)

    return updatedCartProduct
  } catch (error) {
    throw error
  }
}

export const deleteCartService = async (cartProductIds) => {
  try {
    const results = []
    for (const cartProductId of cartProductIds) {
      const check = await findCartQuery(cartProductId)
      if (!check) {
        throw new Error(`Cart product with ID ${cartProductId} not found`)
      }
      const res = await deleteCartQuery(cartProductId, check.cartId)
      results.push(res)
    }
    return results
  } catch (err) {
    throw err
  }
}

export const getCartService = async (userId, stockIds) => {
  try {
    // const check = await findCartUserQuery(userId)
    // if (!check) throw new Error('Data doesnt exist')
    const res = await getCartQuery(userId, stockIds)
    return res
  } catch (err) {
    throw err
  }
}
