import { Sequelize, Op } from 'sequelize'
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
  orderNumber,
  orderDate,
  warehouseId,
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
    console.log('products', products);
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


    console.log('hasil res', res);
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
