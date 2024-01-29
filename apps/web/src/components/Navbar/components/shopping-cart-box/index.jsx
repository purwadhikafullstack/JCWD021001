import { useState } from 'react'
import {
  Box,
  Icon,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  BellIcon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'

const ShoppingCartBox = ({ cartData, cartCount }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box cursor={'pointer'}>
          <Icon as={ShoppingCartIcon} boxSize={'24px'} />
          {cartCount > 0 && (
            <Box
              bgColor={'#FF5757'}
              color={'white'}
              borderRadius={'50%'}
              fontSize={'10px'}
              position={'absolute'}
              top={'5px'}
              right={'-7px'}
              w={'20px'}
              h={'20px'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {cartCount}
            </Box>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent borderRadius={'12px'}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text fontFamily={'nunito'} fontWeight={'700'} fontSize={'18px'}>
            Shopping Cart
          </Text>
        </PopoverHeader>
        <PopoverBody>
          {cartData?.map((cartItems) => (
            <Box key={cartItems.id} display={'flex'} flexDirection={'column'} gap={'14px'}>
              {cartItems?.CartProducts?.slice(0, 3).map((items) => (
                <Box key={items.id} display={'flex'} gap={'8px'}>
                  <Box minW={'64px'} h={'64px'} bgColor={'#F1F1F1'} />
                  <Box w={'full'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                    <Text fontFamily={'nunito'} fontWeight={'600'} fontSize={'14px'}>
                      {items?.product?.name}
                    </Text>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                      <Text fontFamily={'nunito'} fontWeight={'400'} fontSize={'12px'}>
                        S, Dark Blue (2 items)
                      </Text>
                      <Text
                        fontFamily={'nunito'}
                        fontWeight={'700'}
                        fontSize={'16px'}
                        color={'#CD0244'}
                      >
                        Rp {items?.price}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ShoppingCartBox
