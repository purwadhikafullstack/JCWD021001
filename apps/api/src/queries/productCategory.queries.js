import { Op } from 'sequelize'
import ProductCategory from '../models/productCategory.model'

export const getProductCategoryQuery = async () => {
  try {
    const res = await ProductCategory.findAll({
      where: {
        '$parent.parent.name$': {
          [Op.eq]: `Men`,
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
