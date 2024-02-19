import { Op, where } from 'sequelize'
import ProductCategory from '../models/productCategory.model'
import Size from '../models/size.model'
import Product from '../models/product.model'
import Stock from '../models/stock.model'

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
    const groupedCategories = results.reduce((result, item) => {
      const parentName = item.parent.name
      const parentId = item.parent.id

      if (!result[parentName]) {
        result[parentName] = { name: parentName, id: parentId, category: [], size: new Set() }
      }

      // Add category information
      result[parentName].category.push({ id: item.id, name: item.name })

      // Add unique size information
      item.parent.size.forEach((size) => {
        result[parentName].size.add({ id: size.id, name: size.name })
      })

      return result
    }, {})

    // Convert Set to array
    const res = Object.values(groupedCategories).map((group) => ({
      ...group,
      size: [...group.size],
    }))
    return res
  } catch (err) {
    throw err
  }
}

export const findProductCategoryByName = async ({ name = null, parentId = null }) => {
  try {
    const res = await ProductCategory.findOne({
      where: {
        [Op.and]: [
          {
            name: name,
          },
          {
            parentId: parentId,
          },
        ],
      },
    })
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

export const deleteProductCategoryQuery = async (id, parentId, grandParentId = null) => {
  try {
    if (id && parentId && grandParentId === null) {
      const checkParent = await ProductCategory.findAll({
        where: {
          parentId: parentId,
        },
      })

      // return checkParent

      const checkLastChild = await ProductCategory.findAll({
        where: {
          id: {
            [Op.eq]: id,
          },
          parentId: {
            [Op.eq]: parentId,
          },
        },
      })
      // return checkLastChild.length === 1

      if (checkLastChild.length === 1) {
        if (checkParent.length <= 1) {
          throw new Error('You cant delete the last category')
        }
        const products = await Product.findAll({
          where: {
            productCategoryId: id,
          },
        })
        // return products

        for (const product of products) {
          await product.update({
            productCategoryId: null, // Assuming you want to set productCategoryId to null
          })
        }
        const res = ProductCategory.destroy({
          where: {
            id: { [Op.eq]: id },
          },
        })
        return res
      }
    }

    if (grandParentId && parentId === null) {
      // If grandparent is delete
      const checkParent = await ProductCategory.findAll({
        where: {
          parentId: grandParentId,
        },
      })
      // return checkParent
      const parentId = checkParent.map((item) => item.id)
      // return parentId
      const checkChildren = await ProductCategory.findAll({
        where: { parentId: parentId },
      })

      // return checkChildren
      const childrenId = checkChildren.map((item) => item.id)

      // return childrsenId
      const sizes = await Size.findAll({
        where: {
          productCategoryId: parentId,
        },
      })

      // return sizes.length > 0
      const sizeId = sizes.map((item) => item.id)
      // return sizes

      const checkStocks = await Stock.findAll({
        where: {
          sizeId: sizeId,
        },
      })

      // return !!checkStocks.length > 0

      if (checkStocks.length > 0) {
        throw new Error('Stocks still have the size that have stocks')
      } else {
        await Size.destroy({
          where: {
            id: sizeId,
          },
        })
      }

      const products = await Product.findAll({
        where: {
          productCategoryId: childrenId,
        },
      })

      // return products

      if (products.length > 0) {
        // Iterate through each product and update
        for (const product of products) {
          await product.update({
            productCategoryId: null,
          })
        }
      } else {
        console.error('Records not found')
      }

      await ProductCategory.destroy({
        where: {
          parentId: parentId,
        },
      })

      await ProductCategory.destroy({
        where: {
          parentId: grandParentId,
        },
      })
      const res = await ProductCategory.destroy({
        where: {
          id: grandParentId,
        },
      })
      return res
    }

    if (id && parentId === null && grandParentId === null) {
      const checkChildren = await ProductCategory.findAll({
        where: {
          parentId: {
            [Op.eq]: id,
          },
        },
      })

      const childrenId = checkChildren.map((item) => item.id)

      // return childrenId

      const sizes = await Size.findAll({
        where: {
          productCategoryId: id,
        },
      })

      // return sizes

      const sizeId = sizes.map((item) => item.id)
      const checkStocks = await Stock.findAll({
        where: {
          sizeId: sizeId,
        },
      })

      // console.log('checkStocks', checkStocks)
      // return checkStocks
      // return !!checkStocks.length > 0

      if (checkStocks.length > 0) {
        throw new Error(
          'Stocks still have the size that connect to productCategories that have size',
        )
      } else {
        await Size.destroy({
          where: {
            id: sizeId,
          },
        })
      }

      const products = await Product.findAll({
        where: {
          productCategoryId: childrenId,
        },
      })

      // return products

      if (products.length > 0) {
        // Iterate through each product and update
        for (const product of products) {
          await product.update({
            productCategoryId: null,
          })
        }
      } else {
        console.error('Records not found')
      }

      await ProductCategory.destroy({
        where: {
          parentId: id,
        },
      })

      await ProductCategory.destroy({
        where: {
          id: id,
        },
      })
    }
  } catch (err) {
    throw err
  }
}
