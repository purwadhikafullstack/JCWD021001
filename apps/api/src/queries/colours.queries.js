import Colour from '../models/colour.model'

export const getColourQuery = async () => {
  try {
    const res = await Colour.findAll()
    return res
  } catch (err) {
    throw err
  }
}

export const createColourQuery = async (name) => {
  try {
    const res = await Colour.create({ name })
    return res
  } catch (err) {
    throw err
  }
}

export const deleteColourQuery = async (id) => {
  try {
    const res = await Colour.destroy({
      where: {
        id: id,
      },
    })
    return res
  } catch (err) {
    throw err
  }
}
