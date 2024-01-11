import { Op } from 'sequelize'
import ProductType from '../models/productType.model'

export const getProductTypeQuery = async (name = null) => {
  try {
    const filter = {}
    if (name)
      filter.where = {
        name: { [Op.like]: `%${name}%` },
      }
    const res = await ProductType.findAll({
      ...filter,
      include: [
        {
          all: true,
        },
      ],
    })
    return res
  } catch (err) {
    throw err
  }
}
