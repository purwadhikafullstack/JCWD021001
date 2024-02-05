// import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import OrderBody from '../../components/order'
import { useState, useEffect } from 'react'
import { getCart } from '../cart/services/getCart'
import { useLocation } from 'react-router-dom'
import { Navbar } from '../../components/Navbar'
import { productToStock } from './services/productToStock'

const Order = () => {
  const [orderData, setOrderData] = useState([])
  const [stockOrder, setStockOrder] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const location = useLocation()
  const stockData = location.state ? location.state.stockData : null
  const totalPrice = location.state ? location.state.totalPrice : null
  const totalQuantity = location.state ? location.state.totalQuantity : null

  useEffect(() => {
    localStorage.removeItem('hasVisitedCart');

    const fetchData = async () => {
      try {
        const orderPromise = getCart(stockData);
        const stockPromise = productToStock(stockData);

        // Use Promise.all to wait for both promises to resolve
        const [orderResult, stockResult] = await Promise.all([orderPromise, stockPromise]);

        setOrderData(orderResult);
        setStockOrder(stockResult);

        // Compare productId for each CartProduct in each orderItem
        orderResult.forEach((orderItem) => {
          orderItem.CartProducts.forEach((cartProduct) => {
            const matchingStock = stockResult.find((stockItem) => stockItem.productId === cartProduct.productId);

            if (!matchingStock) {
              setError(`Stock not found for productId: ${cartProduct.productId}`);
            }
          });
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch data if both orderData and stockOrder are empty
    if (orderData.length === 0 && stockOrder.length === 0) {
      fetchData();
    }
  }, [orderData, stockOrder, stockData]);

  // Render nothing if data is still being fetched
  if (loading) {
    return null;
  }

  // Handle errors
  if (error) {
    return (
      <Box>
        <Text>Error: {error}</Text>
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <OrderBody orderData={orderData} stockOrder={stockOrder} totalPrice={totalPrice} totalQuantity={totalQuantity}/>
      </Box>
    </>
  )
}

export default Order
