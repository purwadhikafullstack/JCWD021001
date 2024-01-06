import { Box, Text } from '@chakra-ui/react'
import Navbar from '../../components/Navbar/Navbar'
import LaptopCartTable from '../../components/cart-table/laptopCartTable'
import MobileCartTable from '../../components/cart-table/mobileCartTable'

const Cart = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Box bgColor={'brand.grey100'} maxW={'100vw'} minH={'100vh'}>
        <LaptopCartTable />
        <MobileCartTable />
      </Box>
    </>
  )
}

export default Cart
