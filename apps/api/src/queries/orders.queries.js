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

export const findOrderIdQuery = async (orderId) => {
  try {
    const res = await Orders.findOne({
      where: { id: orderId },
    })
    return res
  } catch (err) {
    throw err
  }
}

// export const getOrderQuery = async (orderId) => {
//   try {
//     const res = await Orders.findAll({
//       include: [
//         {model: User}, {model: UserAddress}, {model: Warehouse}, {model: Payments},
//         {model: OrderProducts, include: [{ model: Stock, include: [{ model: Product }] }]}

//       ],
//       where: { id: orderId },
//     })
//     return res
//   } catch (err) {
//     throw err
//   }
// }

export const getOrderQuery = async (userId) => {
  try {
    const res = await Orders.findAll({
      include: [
        { model: User },
        { model: UserAddress },
        { model: Warehouse, as: 'warehouse' },
        { model: Payments },
        {
          model: OrderProducts,
          include: [{ model: Stock, as: 'stocks', include: [{ model: Product, as: 'product' }] }],
        },
      ],
      where: { userId: userId },
    })
    return res
  } catch (err) {
    throw err
  }
}

export const getAllOrderQuery = async () => {
  try {
    const res = await Orders.findAll({
      include: [
        { model: User },
        { model: UserAddress },
        {
          model: Warehouse,
          as: 'warehouse',
          include: [{ model: WarehouseAddress, as: 'addresses' }],
        },
        { model: Payments },
        {
          model: OrderProducts,
          include: [{ model: Stock, as: 'stocks', include: [{ model: Product, as: 'product' }] }],
        },
      ],
    })
    return res
  } catch (err) {
    throw err
  }
}
