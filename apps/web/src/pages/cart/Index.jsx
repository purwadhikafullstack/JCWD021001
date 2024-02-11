import { Box, Text } from '@chakra-ui/react'
import LaptopCartTable from '../../components/cart-table'
// import LaptopCartTable from '../../components/cart-table/laptopCartTable'
// import MobileCartTable from '../../components/cart-table/mobileCartTable'
import { useState, useEffect } from 'react'
import { getCart } from './services/getCart'
import { Navbar } from '../../components/Navbar'

const Cart = () => {
  const [cartData, setCartData] = useState([])

  const refreshCart = async () => {
    try {
      const data = await getCart()
      setCartData(data)
    } catch (error) {
      console.error('Error fetching cart data:', error)
    }
  }

  const handleCartUpdated = () => {
    refreshCart()
  }

  useEffect(() => {
    refreshCart()
  }, [])

  return (
    <Box maxW={'100vw'} minH={'100vh'} overflow={'hidden'} bgColor={'brand.grey100'}>
      <Navbar />
      <Box>
        <LaptopCartTable cartData={cartData} onCartUpdated={handleCartUpdated} />
        {/* <MobileCartTable cartData={cartData} onCartUpdated={handleCartUpdated}/> */}
      </Box>
    </Box>
  )
}

export default Cart
