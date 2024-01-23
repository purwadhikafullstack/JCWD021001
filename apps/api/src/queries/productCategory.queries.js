import { Op } from 'sequelize'
import ProductCategory from '../models/productCategory.model'

export const getProductCategoryQuery = async (gender) => {
  try {
    //     const res = await ProductCategory.sequelize.query(
    //       `SELECT t1.name AS lev1, t2.name as lev2, t3.name as lev3
    // FROM productCategories AS t1
    // LEFT JOIN productCategories AS t2 ON t2.parentId = t1.id
    // LEFT JOIN productCategories AS t3 ON t3.parentId = t2.id
    // WHERE t1.name = 'Men'`,
    //     )
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
