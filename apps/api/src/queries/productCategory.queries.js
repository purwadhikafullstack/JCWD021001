import { Op } from 'sequelize'
import ProductCategory from '../models/productCategory.model'
import Size from '../models/size.model'

export const getProductCategoryQuery = async (gender) => {
  const filter = {}
  if (gender)
    filter.where = {
      '$parent.parent.name$': {
        [Op.eq]: `${gender}`,
      },
    }
  try {
    const results = await ProductCategory.findAll({
      include: [
        {
          model: ProductCategory,
          as: 'parent',
          include: [
            {
              model: ProductCategory,
              as: 'parent',
            },
            {
              model: Size,
              as: 'size',
            },
          ],
        },
      ],
      ...filter,
    })
    // Group by gender
    const groupedCategories = results.reduce((result, item) => {
      const parentName = item.parent.name
      const parentId = item.parent.id
      if (!result[parentName]) {
        result[parentName] = { name: parentName, id: parentId, category: [] }
      }
      result[parentName].category.push({ id: item.id, name: item.name })
      return result
    }, {})
    const res = Object.values(groupedCategories)
    return res
  } catch (err) {
    throw err
  }
}

export const getGenderQuery = async (name = null) => {
  try {
    const filter = {}
    if (!name)
      filter.where = {
        parentId: {
          [Op.eq]: null,
        },
      }
    if (name)
      filter.where = {
        name: {
          [Op.eq]: name,
        },
      }
    const res = await ProductCategory.findAll({
      ...filter,
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
