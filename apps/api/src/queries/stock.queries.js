import Product from '../models/product.model'
import Stock from '../models/stock.model'
import Warehouse from '../models/warehouse.model'
import Colour from '../models/colour.model'
import { Op } from 'sequelize'
import Size from '../models/size.model'
import ProductImage from '../models/productImage.model'
import StockJournal from '../models/stockJournal.model'
import Mutation from '../models/mutation.model'
import OrderProducts from '../models/orderProducts.model'
import ProductCategory from '../models/productCategory.model'

export const getStockQuery = async (warehouseId, name = '', page = null, pageSize = null) => {
  try {
    const offset = (page - 1) * pageSize
    const filter = {}
    if (warehouseId)
      filter.where = {
        warehouseId: {
          [Op.eq]: warehouseId,
        },
        '$product.name$': {
          [Op.like]: `%${name}%`,
        },
      }

    const res = await Stock.findAndCountAll({
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: ProductImage,
              as: 'picture',
            },
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
                  ],
                },
              ],
            },
          ],
        },
        { model: Warehouse, as: 'warehouse' },
        { model: Colour, as: 'colour' },
        { model: Size, as: 'size' },
      ],
      ...filter,
      subQuery: false,
      limit: +pageSize,
      offset: offset,
    })
    return res
  } catch (err) {
    throw err
  }
}

export const createStockQuery = async (productId, warehouseId, qty, sizeId, colourId) => {
  try {
    const res = await Stock.create({ productId, warehouseId, qty, sizeId, colourId })
    return res
  } catch (err) {
    throw err
  }
}

export const getStockByIdQuery = async (id = null) => {
  try {
    const res = await Stock.findOne({
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

export const getSpesificStockQuery = async (
  productId = null,
  warehouseId = null,
  sizeId = null,
  colourId = null,
) => {
  try {
    const res = await Stock.findOne({
      where: {
        [Op.and]: [
          {
            productId: {
              [Op.eq]: productId,
            },
          },
          {
            warehouseId: {
              [Op.eq]: warehouseId,
            },
          },
          {
            sizeId: {
              [Op.eq]: sizeId,
            },
          },
          {
            colourId: {
              [Op.eq]: colourId,
            },
          },
        ],
      },
    })
    return res
  } catch (err) {
    throw err
  }
}

export const getStockByProductIdQuery = async (productId, sizeId, colourId) => {
  try {
    const res = await Stock.sum('qty', {
      where: {
        [Op.and]: [
          {
            productId: {
              [Op.eq]: productId,
            },
          },
          {
            sizeId: {
              [Op.eq]: sizeId,
            },
          },
          {
            colourId: {
              [Op.eq]: colourId,
            },
          },
        ],
      },
    })
    return res
  } catch (err) {
    throw err
  }
}

export const deleteStockQuery = async (id) => {
  try {
    // const willDelete = await StockJournal.findAll({
    //   where: {
    //     stockId: id,
    //   },
    // })
    // const idsToDelete = willDelete.map((record) => record.id)
    // await Mutation.destroy({
    //   where: {
    //     [Op.or]: [
    //       { stockJournalIdRecipient: idsToDelete },
    //       {
    //         stockJournalIdRequester: idsToDelete,
    //       },
    //       {
    //         stockId: id,
    //       },
    //     ],
    //   },
    // })
    // await StockJournal.destroy({
    //   where: {
    //     stockId: id,
    //   },
    // })
    // await OrderProducts.destroy({
    //   where: {
    //     stockId: id,
    //   },
    // })
    const res = await Stock.destroy({
      where: {
        id: id,
      },
    })
    return res
  } catch (err) {
    throw err
  }
}

export const getStockReportQuery = async (
  warehouseId,
  page = 1,
  pageSize = 10,
  startDate,
  endDate,
) => {
  try {
    const offset = (page - 1) * pageSize
    const res = await Stock.sequelize
      .query(`SELECT stocks.id, products.name as  product, sizes.name,
SUM(CASE WHEN isAdding = 1 THEN stockJournals.qty ELSE 0 END) AS addition,
SUM(CASE WHEN isAdding = 0 THEN stockJournals.qty ELSE 0 END) AS reduction,
stocks.qty, child_category.name as category, parent_category.name as grooup,grandparent_category.name as gender
FROM stockJournals
join stocks on stockJournals.stockId = stocks.id
join products on stocks.productId = products.id
join sizes on stocks.sizeId = sizes.id
JOIN productCategories AS child_category ON products.productCategoryId = child_category.id
JOIN productCategories AS parent_category ON child_category.parentId = parent_category.id
JOIN productCategories AS grandparent_category ON parent_category.parentId = grandparent_category.id
where stocks.warehouseId = ${warehouseId} 
AND stockJournals.createdAt>= '${startDate}' AND stockJournals.createdAt<= '${endDate}'
GROUP BY stocks.id
order by products.name, qty DESC
LIMIT ${pageSize} OFFSET ${offset};`)
    return res
  } catch (err) {
    throw err
  }
}
