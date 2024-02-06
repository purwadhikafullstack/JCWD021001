import React from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'
import { useNavigate } from 'react-router-dom'
// import { CreateOrder } from '../../pages/order/services/createOrder'

const CartSummary = ({ totalQuantity, totalPrice, handleCheckout }) => {
  return (
    <Box
      w={{ xl: '334px', '2xl': '430px' }}
      h={'fit-content'}
      bgColor={'white'}
      display={'flex'}
      flexDirection={'column'}
      gap={'12px'}
      padding={'16px'}
    >
      <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
        Shopping Summary
      </Text>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
          Total Price ({totalQuantity} Items)
        </Text>
        <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
          {toRupiah(totalPrice, { floatingPoint: 0 })}
        </Text>
      </Box>
      <Box w={'full'} h={'2px'} bgColor={'#F1F1F1'} />
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={'16px'}>
        <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
          Total Price
        </Text>
        <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'} color={'#CD0244'}>
          {toRupiah(totalPrice, { floatingPoint: 0 })}
        </Text>
      </Box>
      <Button bgColor={'#CD0244'} color={'#ffffff'} onClick={handleCheckout}>
        Process to Checkout
      </Button>
    </Box>
  )
}
export default CartSummary
