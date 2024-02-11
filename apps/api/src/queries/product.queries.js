import Product from '../models/product.model'
import ProductCategory from '../models/productCategory.model'
import { Op } from 'sequelize'
import Size from '../models/size.model'
import ProductImage from '../models/productImage.model'
import Stock from '../models/stock.model'
import Colour from '../models/colour.model'
import ProductToColour from '../models/productToColour.model'
import StockJournal from '../models/stockJournal.model'
import CartProducts from '../models/cartProducts.model'
import Mutation from '../models/mutation.model'

export const getProductQuery = async (
  name = null,
  gender = null,
  group = null,
  category = null,
  id = null,
  sortBy = 'name',
  orderBy = 'ASC',
  page = null,
  pageSize = null,
) => {
  const offset = (page - 1) * pageSize
  try {
    const filter = {}
    if (id)
      filter.where = {
        id: {
          [Op.eq]: id,
        },
      }
    if (name)
      filter.where = {
        ...filter.where,
        name: {
          [Op.like]: `%${name}%`,
        },
      }

    if (gender) {
      if (group) {
        if (category) {
          filter.where = {
            ...filter.where,
            [Op.and]: [
              {
                '$category.parent.parent.name$': gender,
              },
              {
                '$category.parent.name$': group,
              },
              {
                '$category.name$': category.replace(/-/g, ' '),
              },
            ],
          }
        } else {
          filter.where = {
            ...filter.where,
            [Op.and]: [
              {
                '$category.parent.parent.name$': gender,
              },
              {
                '$category.parent.name$': group,
              },
            ],
          }
        }
      } else {
        filter.where = {
          ...filter.where,
          '$category.parent.parent.name$': gender,
        }
      }
    }
    filter.limit = id ? 1000 : +pageSize
    filter.offset = (page - 1) * +pageSize

    const res = await Product.findAndCountAll({
      attributes: ['id', 'name', 'price'],
      include: [
        {
          model: ProductCategory,
          as: 'category',
          attributes: ['id', 'name'],
          include: [
            {
              model: ProductCategory,
              as: 'parent',
              include: [
                {
                  model: ProductCategory,
                  as: 'parent',
                },
                // {
                //   model: Size,
                //   attributes: ['id', 'name', 'productCategoryId'],
                //   as: 'size',
                // },
              ],
            },
            // {
            //   model: Size,
            //   as: 'size',
            // },
          ],
        },
        {
          model: ProductImage,
          as: 'picture',
        },
        // {
        //   model: Stock,
        //   as: 'stocks',
        //   include: [{ model: Colour, as: 'colour' }],
        // },
        // {
        //   model: Colour,
        //   as: 'colour',
        // },
      ],
      order: [[`${sortBy}`, `${orderBy}`]],
      ...filter,
      subQuery: false,
      // limit: id ? 1000 : +pageSize,
      // offset: offset,
    })
    return res
  } catch (err) {
    throw err
  }
}

export const getProductByIdQuery = async (id) => {
  try {
    const res = await Product.findByPk(id, {
      attributes: ['id', 'name', 'price', 'description'],
      include: [
        {
          model: ProductCategory,
          as: 'category',
          attributes: ['id', 'name'],
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
                  attributes: ['id', 'name', 'productCategoryId'],
                  as: 'size',
                },
              ],
            },
            {
              model: Size,
              as: 'size',
            },
          ],
        },
        {
          model: ProductImage,
          as: 'picture',
        },
        {
          model: Stock,
          as: 'stocks',
          include: [{ model: Colour, as: 'colour' }],
        },
        {
          model: Colour,
          as: 'colour',
        },
      ],
    })

    return res
  } catch (err) {
    throw err
  }
}

export const getProductByName = async ({ name = null, productCategoryId = null }) => {
  try {
    const res = await Product.findOne({
      where: {
        [Op.and]: {
          name: name,
          productCategoryId: productCategoryId,
        },
      },
    })
    return res
  } catch (err) {
    throw err
  }
}

export const createProductQuery = async (
  name = null,
  price = null,
  description = null,
  productCategoryId = null,
) => {
  try {
    const res = await Product.create({
      name,
      price,
      description,
      productCategoryId,
    })
    return res
  } catch (err) {
    throw err
  }
}

export const updateProductQuery = async (name, price, description, productCategoryId, id) => {
  try {
    const toBeUpdated = {}
    if (name) toBeUpdated.name = name
    if (price) toBeUpdated.price = price
    if (description) toBeUpdated.description = description
    if (productCategoryId) toBeUpdated.productCategoryId = productCategoryId

    const res = await Product.update(
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

export const deleteProductQuery = async (id) => {
  try {
    const willDeleteStock = await Stock.findAll({
      where: {
        productId: id,
      },
    })
    const willDeleteStockJournal = await StockJournal.findAll({
      where: {
        productId: id,
      },
    })
    const idsToDeleteStock = willDeleteStock.map((record) => record.id)
    const idsToDeleteStockJournal = willDeleteStockJournal.map((record) => record.id)

    await Mutation.destroy({
      where: {
        [Op.or]: [
          {
            stockId: idsToDeleteStock,
          },
          { stockJournalIdRecipient: idsToDeleteStockJournal },
          {
            stockJournalIdRequester: idsToDeleteStockJournal,
          },
        ],
      },
    })

    await StockJournal.destroy({
      where: { productId: id },
    })

    await Stock.destroy({
      where: { productId: id },
    })

    await ProductImage.destroy({
      where: { productId: id },
    })
    await CartProducts.destroy({
      where: { productId: id },
    })
    await ProductToColour.destroy({
      where: {
        productId: id,
      },
    })
    const res = await Product.destroy({
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
