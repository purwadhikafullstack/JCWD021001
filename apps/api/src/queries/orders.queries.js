import { Sequelize, Op } from 'sequelize'
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
import Size from '../models/size.model'
import Colour from '../models/colour.model'
import OrderStatuses from '../models/orderStatuses.model'
import WarehouseAddress from '../models/warehouseAddress.model'
import ProductCategory from '../models/productCategory.model'
import moment from 'moment'

export const createOrderQuery = async (
  userId,
  userAddressId,
  warehouseId,
  totalPrice,
  totalQuantity,
  shippingCost,
  orderStatusId,
  orderNumber,
  products,
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
    if (orderId) {
      const res = await Orders.findOne({
        where: { id: orderId },
      })
      return res
    } else if (userId) {
      const res = await Orders.findAll({
        where: { userId: userId },
      })
      return res
    }
  } catch (err) {
    throw err
  }
}

export const findOrderStatusQuery = async (orderStatusId) => {
  try {
    const res = Orders.findAll({
      include: [{ model: Payments }],
      where: { orderStatusId: orderStatusId },
    })
    return res
  } catch (err) {
    throw err
  }
}

export const updateOrderQuery = async (orderId, orderStatusId) => {
  try {
    let expectedDeliveryDate = null
    let res = null
    if (orderStatusId === 4) {
      expectedDeliveryDate = moment().tz('Asia/Jakarta').add(1, 'day').toDate()
      await Orders.update(
        { orderStatusId: orderStatusId, expectedDeliveryDate: expectedDeliveryDate },
        { where: { id: orderId } },
      )
    } else {
      await Orders.update({ orderStatusId: orderStatusId }, { where: { id: orderId } })
    }
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
      whereClause.orderStatusId = {
        [Op.in]: orderStatusId,
      }
    }

    const limit = parseInt(pageSize, 10) || 10
    let offset = (parseInt(page, 10) - 1) * limit

    if (orderNumber) {
      offset = 0
    }

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
      order: [['orderDate', 'DESC']],
      distinct: true,
    })

    const totalPages = Math.ceil(orders.count / limit)

    return {
      orders: orders.rows,
      pagination: {
        currentPage: parseInt(page, 10),
        totalPages: totalPages,
        totalItems: orders.count,
        pageSize: limit,
      },
      offset: offset,
    }
  } catch (err) {
    throw err
  }
}

export const getOrderManagementQuery = async ({
  adminWarehouse,
  orderNumber,
  orderDate,
  warehouseId,
  orderStatusId,
  page,
  pageSize,
}) => {
  try {
    const whereClause = {}

    if (adminWarehouse) {
      whereClause.warehouseId = adminWarehouse
    }

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
      whereClause.orderStatusId = {
        [Op.in]: orderStatusId,
      }
    }

    if (warehouseId) {
      whereClause.warehouseId = warehouseId
    }

    const limit = parseInt(pageSize, 10) || 10
    let offset = (parseInt(page, 10) - 1) * limit

    if (orderNumber || warehouseId) {
      offset = 0
    }

    const orders = await Orders.findAndCountAll({
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
      limit: limit,
      offset: offset,
      order: [['orderDate', 'DESC']],
      distinct: true,
    })

    const totalPages = Math.ceil(orders.count / limit)

    return {
      orders: orders.rows,
      pagination: {
        currentPage: parseInt(page, 10),
        totalPages: totalPages,
        totalItems: orders.count,
        pageSize: limit,
      },
      offset: offset,
    }
  } catch (err) {
    throw err
  }
}

export const getOrderDetailQuery = async (orderId) => {
  try {
    const orders = await Orders.findOne({
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
      where: { id: orderId },
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

export const productToStockIdQuery = async (products, nearestWarehouse) => {
  try {
    // console.log('products', products);
    let whereCondition = {}

    if (products && products.length > 0) {
      const productIdArray = products.map((item) => item.productId)
      const colourIdArray = products.map((item) => item.colourId)
      const sizeIdArray = products.map((item) => item.sizeId)

      whereCondition = {
        ...whereCondition,
        productId: { [Sequelize.Op.in]: productIdArray },
        colourId: { [Sequelize.Op.in]: colourIdArray },
        sizeId: { [Sequelize.Op.in]: sizeIdArray },
      }
    }

    let warehouseCondition = {}
    if (nearestWarehouse) {
      // Disini tambahkan logika untuk menemukan warehouse terdekat
      warehouseCondition = {
        warehouseId: nearestWarehouse, // Contoh sederhana, asumsikan nearestWarehouse adalah warehouseId
      }
    }
    const res = await Stock.findAll({
      where: {
        ...whereCondition,
        ...warehouseCondition,
      },
    })

    // console.log('hasil res', res);
    return res
  } catch (err) {
    throw err
  }
}

export const calculationCheckStock = async (orderId) => {
  try {
    const orders = await Orders.findOne({
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
      where: { id: orderId },
    })
    const warehouse = await Warehouse.findAll({
      include: [{ model: WarehouseAddress }, { model: Stock, as: 'stock' }],
    })
    return { orders: orders, warehouse: warehouse }
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
    const res = await Orders.sequelize.query(`SELECT 
    SUM(totalPrice) AS TotalSales,
    SUM(totalQuantity) AS TotalQuantity
FROM 
    orders
WHERE 
    orderDate >= '${startDate}' AND orderDate <= '${endDate}' AND warehouseId = ${warehouseId} AND orders.orderStatusId<>1
LIMIT ${pageSize} OFFSET ${offset};`)
    return res
  } catch (err) {
    throw err
  }
}

export const getAllOrderByCategoryQuery = async (warehouseId, startDate, endDate) => {
  try {
    const res = await OrderProducts.sequelize
      .query(`SELECT  grandparent_category.name as grandparent_name, parent_category.name AS group_name, parent_category.id as group_id, child_category.name as child, 
      SUM(orderProducts.quantity) as ordercount,
      SUM(orderProducts.price) AS total
      FROM orders
      JOIN orderProducts ON orders.id = orderProducts.orderId
      JOIN stocks ON orderProducts.stockId = stocks.id
      JOIN products ON stocks.productId = products.id
      JOIN productCategories AS child_category ON products.productCategoryId = child_category.id
      JOIN productCategories AS parent_category ON child_category.parentId = parent_category.id
      JOIN productCategories AS grandparent_category ON parent_category.parentId = grandparent_category.id
      WHERE orders.orderDate >= '${startDate}' AND orders.orderDate <= '${endDate}'
      AND orders.warehouseId = ${warehouseId} AND orders.orderStatusId <> 1
      GROUP BY child_category.id
      ORDER BY child, ordercount
      ;`)
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
    const res = await OrderProducts.sequelize
      .query(`SELECT p.id, p.name, grandparent_category.name as grandparent_name,
  SUM(op.price) as total, 
  SUM(op.quantity) as sold
FROM orders as o
JOIN orderProducts as op ON o.id = op.orderId
JOIN stocks as st ON op.stockId = st.id
JOIN products as p ON st.productId = p.id
JOIN productCategories AS child_category ON p.productCategoryId = child_category.id
JOIN productCategories AS parent_category ON child_category.parentId = parent_category.id
JOIN productCategories AS grandparent_category ON parent_category.parentId = grandparent_category.id
WHERE o.orderDate >= '${startDate}' 
  AND o.orderDate <= '${endDate}' 
  AND o.warehouseId = ${Number(warehouseId)}
   AND o.orderStatusId <> 1
GROUP BY p.id
order by sold
LIMIT ${pageSize} OFFSET ${offset};
`)
    return res
  } catch (err) {
    throw err
  }
}
