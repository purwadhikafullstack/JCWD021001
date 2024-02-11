import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'

const OrderBodyMobile = ({ orderItem }) => {
  return (
    <Box>
      <Box
        display={{ base: 'flex', xl: 'none' }}
        flexDirection={'column'}
        gap={'16px'}
        w={'full'}
        h={'fit-content'}
        padding={'18px'}
      >
        <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'}>
          Products Ordered
        </Text>
        <Box display={'flex'} flexDirection={'column'} gap={'24px'}>
          {orderItem?.CartProducts?.map((item) => (
            <Box key={item.id} w={'full'} display={'flex'} gap={'16px'}>
              <Box w={'64px'} h={'64px'} bgColor={'brand.grey100'} />
              <Box display={'flex'} flexDirection={'column'} w={'full'}>
                <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                  {item?.product?.name}
                </Text>
                <Text fontFamily={'body'} fontWeight={'400'} fontSize={'14px'} color={'#838383'}>
                  {item?.size?.name}, {item?.colour?.name}
                </Text>
                <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                    {item?.quantity} x {toRupiah(+item?.product?.price, { floatingPoint: 0 })}
                  </Text>
                  <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'} color={'#CD0244'}>
                    {toRupiah(+item?.price, { floatingPoint: 0 })}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default OrderBodyMobile
