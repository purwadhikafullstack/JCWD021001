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

export const createProductCategoryQuery = async (name, parentId = null) => {
  try {
    const res = await ProductCategory.create({
      name,
      parentId,
    })
    return res
  } catch (err) {
    throw err
  }
}

export const updateProductCategoryQuery = async (name, parentId = null, id) => {
  try {
    const toBeUpdated = {}
    if (name) toBeUpdated.name = name
    if (parentId) toBeUpdated.parentId = parentId
    const res = await ProductCategory.update(
      {
        ...toBeUpdated,
      },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      },
    )
    return res
  } catch (err) {
    throw err
  }
}

export const deleteProductCategoryQuery = async (id) => {
  try {
    const res = await ProductCategory.destroy({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    })
    return res
  } catch (err) {
    throw err
  }
}
