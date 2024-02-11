import { createProdToColQuery } from '../queries/prodToCol.queries'

export const createProdToColService = async (productId, colourId) => {
  try {
    const res = await createProdToColQuery(productId, colourId)
    return res
  } catch (err) {
    throw err
  }
}
