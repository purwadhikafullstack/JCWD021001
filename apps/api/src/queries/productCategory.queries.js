import { Op } from 'sequelize'
import ProductCategory from '../models/productCategory.model'

export const getProductCategoryQuery = async (gender) => {
  const filter = {}
  if (gender)
    filter.where = {
      '$parent.parent.name$': {
        [Op.eq]: `${gender}`,
      },
    }
  try {
    const res = await ProductCategory.findAll({
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
      ...filter,
    })

    return res
  } catch (err) {
    throw err
  }
}

export const getGenderQuery = async () => {
  try {
    // const res = await ProductCategory.sequelize.query(
    //   `SELECT id, name FROM productCategories WHERE parentId IS NULL;`,
    // )
    const res = await ProductCategory.findAll({
      where: {
        parentId: { [Op.eq]: null },
      },
    })
    return res
  } catch (err) {
    throw err
  }
}
