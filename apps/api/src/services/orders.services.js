import {
  createOrderQuery,
  findOrderIdQuery,
  findWarehouseQuery,
  getOrderManagementQuery,
  getOrderQuery,
  getWarehouseQuery,
  updateOrderQuery,
} from '../queries/orders.queries'

const calcTotalPrice = (products) => {
  return products.reduce((total, product) => {
    return total + product.priceProduct * product.quantity
  }, 0)
}

export const createOrderService = async (
  userId,
  userAddressId,
  warehouseId,
  totalPrice,
  totalQuantity,
  shippingCost,
  orderStatusId,
  products,
) => {
  try {
    const orderNumber = `ORD-${Date.now()}`
    const newTotalPrice = calcTotalPrice(products)
    console.log('ssad', newTotalPrice)
    if (newTotalPrice != totalPrice) throw new Error('Total Price is wrong')
    const res = await createOrderQuery(
      userId,
      userAddressId,
      warehouseId,
      newTotalPrice,
      totalQuantity,
      shippingCost,
      orderStatusId,
      orderNumber,
      products,
    )
    return res
  } catch (err) {
    throw err
  }
}
export const updateOrderService = async (orderId, orderStatusId) => {
  try {
    const check = await findOrderIdQuery({ orderId })
    if (!check) throw new Error('Data doesnt exist')
    const res = await updateOrderQuery(orderId, orderStatusId)
    return res
  } catch (err) {
    throw err
  }
}

export const getOrderService = async (userId, orderNumber, orderDate, orderStatusId, page, pageSize) => {
  try {
    const check = await findOrderIdQuery({ userId })
    if (!check) throw new Error('Data doesnt exist')
    const res = await getOrderQuery({ userId, orderNumber, orderDate, orderStatusId, page, pageSize})
    return res
  } catch (err) {
    throw err
  }
}

export const getOrderManagementService = async (orderNumber, orderDate, warehouseId) => {
  try {
    //   const check = await findOrderIdQuery({ userId })
    //   if (!check) throw new Error('Data doesnt exist')
    const res = await getOrderManagementQuery({ orderNumber, orderDate, warehouseId })
    return res
  } catch (err) {
    throw err
  }
}

export const getWarehouseService = async () => {
  try {
    const check = await findWarehouseQuery()
    if (!check) throw new Error('Data doesnt exist')
    const res = await getWarehouseQuery()
    return res
  } catch (err) {
    throw err
  }
}
