import { Op, literal } from 'sequelize'
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
      whereClause.orderStatusId = orderStatusId
    }

    const limit = parseInt(pageSize, 10) || 10 // Default page size is 10
    const offset = (parseInt(page, 10) - 1) * limit

    const totalFilteredOrders = await Orders.count({
      where: Object.keys(whereClause).length > 0 ? whereClause : { userId: userId },
    });

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
