import Colour from '../models/colour.model'

export const getColourQuery = async () => {
  try {
    const res = await Colour.findAll()
    return res
  } catch (err) {
    throw err
  }
}
