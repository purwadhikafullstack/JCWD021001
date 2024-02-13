import { Box } from '@chakra-ui/react'
import LaptopCartTable from '../../components/cart-table'
import { useState, useEffect } from 'react'
import { getCart } from './services/getCart'
import { Navbar } from '../../components/Navbar'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const Cart = () => {
  const [cartData, setCartData] = useState([])
  const user = useSelector((state) => state.AuthReducer.user)

  const refreshCart = async () => {
    try {
      const data = await getCart(user?.id)
      setCartData(data)
    } catch (error) {
      toast.error(err)
    }
  }

  const handleCartUpdated = () => {
    refreshCart()
  }

  useEffect(() => {
    refreshCart()
  }, [user?.id])

  return (
    <Box maxW={'100vw'} minH={'100vh'} overflow={'hidden'} bgColor={'brand.grey100'}>
      <Navbar />
      <Box>
        <LaptopCartTable cartData={cartData} onCartUpdated={handleCartUpdated} />
      </Box>
    </Box>
  )
}

export default Cart
