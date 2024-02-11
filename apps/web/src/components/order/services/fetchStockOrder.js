import { productToStock } from '../../../pages/order/services/productToStock'

export const fetchStockOrder = async (orderData, nearestWarehouse, setStockOrder) => {
  try {
    const products = orderData.reduce((acc, orderItem) => {
        orderItem.CartProducts.forEach(cartProduct => {
          acc.push({
            productId: cartProduct.productId,
            colourId: cartProduct.colourId,
            sizeId: cartProduct.sizeId,
            quantity: cartProduct.quantity
          });
        });
        return acc;
      }, []);
    const stockResult = await productToStock(products, nearestWarehouse?.id)
    setStockOrder(stockResult)
  } catch (error) {
    console.error('Error fetching stock data:', error)
  }
}

