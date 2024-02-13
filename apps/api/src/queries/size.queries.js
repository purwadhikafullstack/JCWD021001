import Size from '../models/size.model'

export const createSizeQuery = async (name, productCategoryId) => {
  try {
    const res = await Size.create({ name, productCategoryId })
    return res
  } catch (err) {
    throw err
  }
}

export const deleteSizeQuery = async (id) => {
  try {
    const res = await Size.destroy({
      where: {
        id: id,
      },
    })
    return res
  } catch (err) {
    throw err
  }
}
