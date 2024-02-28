import ProductToColour from '../models/productToColour.model'
import Stock from '../models/stock.model'
import { createColourQuery, deleteColourQuery, getColourQuery } from '../queries/colours.queries'

export const getColourService = async () => {
  try {
    const res = await getColourQuery()
    return res
  } catch (err) {
    throw err
  }
}

export const createColourService = async (name) => {
  try {
    const res = await createColourQuery(name)
    return res
  } catch (err) {
    throw err
  }
}

export const deleteColourService = async (id) => {
  try {
    const checkStock = await Stock.findAll({
      where: {
        colourId: id,
      },
    })
    if (checkStock.length > 0) {
      throw new Error('Stocks has colour that want to be deleted')
    }
    const checkProductColours = ProductToColour.findAll({
      where: {
        colourId: id,
      },
    })
    // return checkProductColours

    // return checkStock

    await ProductToColour.destroy({
      where: {
        colourId: id,
      },
    })
    const res = await deleteColourQuery(id)
    return res
  } catch (err) {
    throw err
  }
}
