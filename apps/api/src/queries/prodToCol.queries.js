import ProductToColour from '../models/productToColour.model'

export const createProdToColQuery = async (productId, colourId) => {
  try {
    const res = await ProductToColour.create({
      productId,
      colourId,
      ProductId: productId,
      ColourId: colourId,
    })
    return res
  } catch (err) {
    throw err
  }
}
