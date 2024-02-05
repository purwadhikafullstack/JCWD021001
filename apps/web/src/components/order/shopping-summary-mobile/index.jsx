import React from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'

const ShoppingSummaryMobile = ({ shippingCost, totalQuantity, totalPrice, handlePaymentClick }) => {
  return (
    <Box
      bgColor={'white'}
      w={'full'}
      h={'fit-content'}
      padding={'16px'}
      display={{ base: 'flex', xl: 'none' }}
      flexDirection={'column'}
      gap={'12px'}
      position={'fixed'}
      bottom={'0'}
    >
      <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
        Shopping Summary
      </Text>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
          Total Price ({totalQuantity} Items)
        </Text>
        <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
          {toRupiah(+totalPrice, { floatingPoint: 0 })}
        </Text>
      </Box>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
          Shipping Price
        </Text>
        <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
          {toRupiah(+shippingCost[0]?.costs[0]?.cost[0]?.value || 0, { floatingPoint: 0 })}
        </Text>
      </Box>
      <Box w={'full'} h={'2px'} bgColor={'#F1F1F1'} />
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mb={'16px'}>
        <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
          Total Price
        </Text>
        <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'} color={'#CD0244'}>
          {toRupiah(+totalPrice, { floatingPoint: 0 })}
        </Text>
      </Box>
      <Button bgColor={'#CD0244'} color={'#ffffff'} onClick={handlePaymentClick}>
        Process to Payment
      </Button>
    </Box>
  )
}

export default ShoppingSummaryMobile
