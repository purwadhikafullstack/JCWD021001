import {
  calculationCheckStock,
  createOrderQuery,
  findOrderIdQuery,
  getOrderQuery,
  findWarehouseQuery,
  getOrderManagementQuery,
  getWarehouseQuery,
  productToStockIdQuery,
  updateOrderQuery,
  getAllOrderByCategoryQuery, // by putu
  getAllOrderByProductQuery, // by putu
  getAllOrderQuery, // by putu
  getSpesificStockQuery, // by putu
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

export const getOrderService = async (
  userId,
  orderNumber,
  orderDate,
  orderStatusId,
  page,
  pageSize,
) => {
  try {
    const check = await findOrderIdQuery({ userId })
    if (!check) throw new Error('Data doesnt exist')
    const res = await getOrderQuery({
      userId,
      orderNumber,
      orderDate,
      orderStatusId,
      page,
      pageSize,
    })
    return res
  } catch (err) {
    throw err
  }
}

export const getOrderManagementService = async (
  orderNumber,
  orderDate,
  warehouseId,
  orderStatusId,
  page,
  pageSize,
) => {
  try {
    //   const check = await findOrderIdQuery({ userId })
    //   if (!check) throw new Error('Data doesnt exist')
    const res = await getOrderManagementQuery({
      orderNumber,
      orderDate,
      warehouseId,
      orderStatusId,
      page,
      pageSize,
    })
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

export const productToStockIdService = async (products, nearestWarehouse) => {
  try {
    // console.log('productId', productId);
    const res = await productToStockIdQuery(products, nearestWarehouse)
    return res
  } catch (err) {
    throw err
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in kilometers

  return distance
}

export const calculationCheckStockService = async (orderId) => {
  try {
    const { orders, warehouse } = await calculationCheckStock(orderId)

    const checkStockResults = []

    for (const orderProduct of orders.OrderProducts) {
      const { quantity, stocks } = orderProduct
      const { productId } = stocks

      const selectedWarehouse = warehouse.find((wh) => wh.id === orders.warehouseId)

      if (selectedWarehouse) {
        const selectedStock = selectedWarehouse.stock.find((stock) => stock.productId === productId)

        if (selectedStock) {
          const availableQuantity = selectedStock.qty

          if (availableQuantity >= quantity) {
            checkStockResults.push({
              orderId: orders.id,
              productId,
              quantity,
              status: 'Available',
              selectedWarehouse: {
                id: selectedWarehouse.id,
                name: selectedWarehouse.name,
              },
              availableQuantity,
            })
          } else {
            // Find the nearest warehouse
            const { latitude: originLat, longitude: originLon } = selectedWarehouse.WarehouseAddress

            let nearestWarehouse = selectedWarehouse
            let nearestWarehouseQuantity = availableQuantity

            while (nearestWarehouseQuantity < quantity) {
              // Find the next nearest warehouse
              const nextNearestWarehouse = warehouse
                .filter((wh) => wh.id !== orders.warehouseId && wh.id !== nearestWarehouse.id)
                .reduce(
                  (nextNearest, wh) => {
                    const { latitude, longitude } = wh.WarehouseAddress
                    const distance = calculateDistance(originLat, originLon, latitude, longitude)
                    if (distance < nextNearest.distance) {
                      return { distance, warehouse: wh }
                    }
                    return nextNearest
                  },
                  { distance: Infinity, warehouse: null },
                )

              // Check stock in the next nearest warehouse
              const nextNearestWarehouseStock = nextNearestWarehouse.warehouse.stock.find(
                (stock) => stock.productId === productId,
              )

              if (nextNearestWarehouseStock) {
                console.log('halo', nextNearestWarehouseStock.qty)
                nearestWarehouse = nextNearestWarehouse.warehouse
                nearestWarehouseQuantity =
                  nextNearestWarehouseStock.qty > nearestWarehouseQuantity
                    ? nextNearestWarehouseStock.qty
                    : nearestWarehouseQuantity
              } else {
                break
              }
            }

            const needSelectedWarehouseQuantity = quantity - availableQuantity

            // Update checkStockResults based on the condition
            checkStockResults.push({
              orderId: orders.id,
              productId,
              quantity,
              status: availableQuantity >= quantity ? 'Available Stock' : 'Insufficient Stock',
              selectedWarehouse: {
                id: selectedWarehouse.id,
                name: selectedWarehouse.name,
              },
              selectedWarehouseQuantity: availableQuantity,
              nearestWarehouse: {
                id: nearestWarehouse.id,
                name: nearestWarehouse.name,
              },
              nearestWarehouseStatus:
                nearestWarehouseQuantity >= quantity ? 'Available Stock' : 'Insufficient Stock',
              nearestWarehouseQuantity,
              needSelectedWarehouseQuantity,
            })
          }
        } else {
          checkStockResults.push({
            orderId: orders.id,
            productId,
            quantity,
            status: 'Stock Not Found',
          })
        }
      } else {
        checkStockResults.push({
          orderId: orders.id,
          productId,
          quantity,
          status: 'Warehouse Not Found',
        })
      }
    }

    return {
      // orders,
      // warehouse,
      checkStockResults,
    }
  } catch (err) {
    throw err
  }
}

export const getAllOrderService = async (
  sortBy,
  orderBy,
  page,
  pageSize,
  warehouseId,
  startDate,
  endDate,
) => {
  try {
    const res = await getAllOrderQuery(
      sortBy,
      orderBy,
      page,
      pageSize,
      warehouseId,
      startDate,
      endDate,
    )
  } catch (err) {
    throw err
  }
}

export const getAllOrderByCategoryService = async (warehouseId, startDate, endDate) => {
  try {
    const res = await getAllOrderByCategoryQuery(warehouseId, startDate, endDate)
    return res
  } catch (err) {
    throw err
  }
}

export const getAllOrderByProductService = async (
  page,
  pageSize,
  warehouseId,
  startDate,
  endDate,
) => {
  try {
    const res = await getAllOrderByProductQuery(page, pageSize, warehouseId, startDate, endDate)
    return res
  } catch (err) {
    throw err
  }
}
