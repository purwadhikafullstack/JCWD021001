import { Op } from 'sequelize'
import ProductCategory from '../models/productCategory.model'

export const getProductCategoryQuery = async (gender) => {
  try {
    const res = await ProductCategory.findAll({
      where: {
        '$parent.parent.name$': {
          [Op.eq]: `${gender}`,
        },
      },
      include: [
        {
          model: ProductCategory,
          as: 'parent',
          include: {
            model: ProductCategory,
            as: 'parent',
          },
        },
      ],
    })
    return res
  } catch (err) {
    throw err
  }
}
