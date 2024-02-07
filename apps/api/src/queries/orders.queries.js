import { literal } from 'sequelize'
import Orders from '../models/orders.model'
import OrderProducts from '../models/orderProducts.model'
import Payments from '../models/payments.model'
import Product from '../models/product.model'
import { generateMidtransToken } from '../midtrans'
import User from '../models/user.model'
import Warehouse from '../models/warehouse.model'
import Stock from '../models/stock.model'
import UserAddress from '../models/userAddress.model'
import WarehouseAddress from '../models/warehouseAddress.model'
import ProductCategory from '../models/productCategory.model'
import { Op, Sequelize } from 'sequelize'
import Size from '../models/size.model'
import Colour from '../models/colour.model'
import OrderStatuses from '../models/orderStatuses.model'

export const createOrderQuery = async (
  userId,
  userAddressId,
  warehouseId,
  totalPrice,
  totalQuantity,
  shippingCost,
  orderStatusId,
  orderNumber,
) => {
  try {
    const order = await Orders.create({
      userId: userId,
      userAddressId: userAddressId,
      warehouseId: warehouseId,
      totalPrice: totalPrice,
      totalQuantity: totalQuantity,
      shippingCost: shippingCost,
      orderStatusId: orderStatusId,
      orderNumber: orderNumber,
    })
    // const orderProduct = await OrderProducts.create({ orderId: order.id, productId: productId, price, quantity: quantity })
    const orderProduct = await Promise.all(
      products.map(async (product) => {
        return await OrderProducts.create({
          orderId: order.id,
          stockId: product.stockId,
          price: product.price,
          quantity: product.quantity,
        })
      }),
    )
    // const product = await Product.findOne({ where: { id: productId } })
    const user = await User.findOne({ where: { id: userId } })
    const midtransToken = await generateMidtransToken(
      orderNumber,
      totalPrice,
      products,
      shippingCost,
      user.id,
      user.username,
      user.email,
    )
    return { order, orderProduct, midtransToken }
  } catch (err) {
    throw err
  }
}

export const findOrderIdQuery = async ({ orderId, userId }) => {
  try {
    console.log('userId', userId)
    if (orderId) {
      const res = await Orders.findOne({
        where: { id: orderId },
      })
      return res
    } else if (userId) {
      const res = await Orders.findOne({
        where: { userId: userId },
      })
      return res
    }
  } catch (err) {
    throw err
  }
}

export const updateOrderQuery = async (orderId, orderStatusId) => {
  try {
    const res = await Orders.update({ orderStatusId: orderStatusId }, { where: { id: orderId } })
    return res
  } catch (err) {
    throw err
  }
}

export const getOrderQuery = async ({
  userId,
  orderNumber,
  orderDate,
  orderStatusId,
  page,
  pageSize,
}) => {
  try {
    const whereClause = {}

    if (orderNumber) {
      whereClause.orderNumber = orderNumber
    }

    if (orderDate) {
      const formattedInputDate = new Date(orderDate)
      whereClause.orderDate = {
        [Op.gte]: formattedInputDate,
        [Op.lt]: new Date(formattedInputDate.getTime() + 24 * 60 * 60 * 1000),
      }
    }

    if (orderStatusId) {
      whereClause.orderStatusId = orderStatusId
    }

    const limit = parseInt(pageSize, 10) || 10 // Default page size is 10
    const offset = (parseInt(page, 10) - 1) * limit

    const totalFilteredOrders = await Orders.count({
      where: Object.keys(whereClause).length > 0 ? whereClause : { userId: userId },
    })

    const totalPages = Math.ceil(totalFilteredOrders / limit)

    const orders = await Orders.findAndCountAll({
      include: [
        { model: User },
        { model: Warehouse, as: 'warehouse' },
        { model: Payments },
        { model: OrderStatuses },
        {
          model: OrderProducts,
          include: [
            {
              model: Stock,
              as: 'stocks',
              include: [
                { model: Product, as: 'product' },
                { model: Size, as: 'size' },
                { model: Colour, as: 'colour' },
              ],
            },
          ],
        },
      ],
      where: Object.keys(whereClause).length > 0 ? whereClause : { userId: userId },
      limit: limit,
      offset: offset,
    })

    return {
      orders: orders.rows,
      pagination: {
        currentPage: parseInt(page, 10),
        totalPages: totalPages,
        totalItems: totalFilteredOrders,
        pageSize: limit,
      },
    }
    // return orders.rows
  } catch (err) {
    throw err
  }
}

export const getOrderManagementQuery = async ({ orderNumber, orderDate, warehouseId }) => {
  try {
    const whereClause = {}

    if (orderNumber) {
      whereClause.orderNumber = orderNumber
    }

    if (orderDate) {
      const formattedInputDate = new Date(orderDate)

      whereClause.orderDate = {
        [Op.gte]: formattedInputDate,
        [Op.lt]: new Date(formattedInputDate.getTime() + 24 * 60 * 60 * 1000),
      }
    }

    if (warehouseId) {
      whereClause['$warehouse.id$'] = warehouseId
    }

    const orders = await Orders.findAll({
      include: [
        { model: User },
        { model: UserAddress },
        { model: Warehouse, as: 'warehouse' },
        { model: Payments },
        { model: OrderStatuses },
        {
          model: OrderProducts,
          include: [
            {
              model: Stock,
              as: 'stocks',
              include: [
                { model: Product, as: 'product' },
                { model: Size, as: 'size' },
                { model: Colour, as: 'colour' },
              ],
            },
          ],
        },
      ],
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    })

    return orders
  } catch (err) {
    throw err
  }
}

export const findWarehouseQuery = async () => {
  try {
    const res = await Warehouse.findOne()
    return res
  } catch (err) {
    throw err
  }
}

export const getWarehouseQuery = async () => {
  try {
    const res = await Warehouse.findAll()
    return res
  } catch (err) {
    throw err
  }
}

export const getAllOrderQuery = async (
  sortBy = 'orderDate',
  orderBy = 'DESC',
  page = 1,
  pageSize = 10,
  warehouseId = null,
  startDate = null,
  endDate = null,
) => {
  try {
    const offset = (page - 1) * pageSize
    let filteredAttributes = [
      'id',
      'warehouseId',
      'totalPrice',
      'totalQuantity',
      'orderDate',
      'orderStatusId',
      [
        Sequelize.literal(
          `(SELECT SUM(totalPrice) FROM Orders WHERE orderDate BETWEEN '${startDate}' AND '${endDate}')`,
        ),
        'totalPriceSum',
      ],
    ]
    const filter = {}
    filter.where = {
      warehouseId: {
        [Op.eq]: warehouseId,
      },
      orderDate: {
        [Op.lte]: new Date(endDate),
        [Op.gte]: new Date(startDate),
      },
    }

    const res = await Orders.findAll({
      attributes: filteredAttributes,
      include: [
        {
          model: Warehouse,
          attributes: ['name'],
          as: 'warehouse',
          include: [{ model: WarehouseAddress, attributes: ['location'], as: 'addresses' }],
        },
        {
          model: OrderProducts,
          attributes: ['price', 'quantity'],
          include: [
            {
              model: Stock,
              as: 'stocks',
              attributes: ['productId'],
              include: [
                {
                  model: Product,
                  as: 'product',
                  attributes: ['name', 'price', 'productCategoryId'],
                  include: [
                    {
                      model: ProductCategory,
                      as: 'category',
                      include: [
                        {
                          model: ProductCategory,
                          as: 'parent',
                          include: [{ model: ProductCategory, as: 'parent' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          model: OrderStatuses,
          as: 'status',
          attributes: ['name'],
        },
      ],
      ...filter,
      order: [[`${sortBy}`, `${orderBy}`]],
      limit: +pageSize,
      offset: offset,
    })
    return res
  } catch (err) {
    throw err
  }
}

export const getAllOrderByCategoryQuery = async (warehouseId, startDate, endDate) => {
  try {
    const res = await OrderProducts.sequelize
      .query(`SELECT  grandparent_category.name as grandparent_name, parent_category.name AS group_name, parent_category.id as group_id,  
      SUM(orderProducts.quantity) as ordercount,
      SUM(orderProducts.price * orderProducts.quantity) AS total
      FROM orders
      JOIN orderProducts ON orders.id = orderProducts.orderId
      JOIN stocks ON orderProducts.stockId = stocks.id
      JOIN products ON stocks.productId = products.id
      JOIN productCategories AS child_category ON products.productCategoryId = child_category.id
      JOIN productCategories AS parent_category ON child_category.parentId = parent_category.id
      JOIN productCategories AS grandparent_category ON parent_category.parentId = grandparent_category.id
      WHERE orders.orderDate >= '${startDate}' AND orders.orderDate <= '${endDate}'
      AND orders.warehouseId = ${warehouseId}
      GROUP BY parent_category.id;`)
    return res
  } catch (err) {
    throw err
  }
}

export const getAllOrderByProductQuery = async (
  page,
  pageSize,
  warehouseId,
  startDate,
  endDate,
) => {
  try {
    const offset = (page - 1) * pageSize
    const res = await OrderProducts.sequelize.query(`SELECT p.id, p.name, 
  SUM(op.price * op.quantity) as total, 
  SUM(op.quantity) as sold
FROM orders as o
JOIN orderProducts as op ON o.id = op.orderId
JOIN stocks as st ON op.stockId = st.id
JOIN products as p ON st.productId = p.id
WHERE o.orderDate >= '${startDate}' 
  AND o.orderDate <= '${endDate}' 
  AND o.warehouseId = ${Number(warehouseId)}
GROUP BY p.id
LIMIT ${pageSize} OFFSET ${offset};
`)
    return res
  } catch (err) {
    throw err
  }
}
