import {
  Box,
  Icon,
  Text,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { IMAGE_API_ROUTE } from '../../../../services/route'
import toRupiah from '@develoka/angka-rupiah-js'

const ShoppingCartBox = ({ cartData, cartCount }) => {
  const navigate = useNavigate()
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
        <PopoverBody padding={'18px'}>
          {cartData?.map((cartItems) => (
            <Box key={cartItems.id} display={'flex'} flexDirection={'column'} gap={'14px'}>
              {cartItems?.CartProducts?.slice(0, 3).map((items) => (
                <Box key={items.id} display={'flex'} gap={'8px'}>
                  <Box
                    maxW={'64px'}
                    h={'64px'}
                    bgColor={'#F1F1F1'}
                    cursor={'pointer'}
                    onClick={() => navigate('/cart')}
                  >
                    <Image
                      src={`${IMAGE_API_ROUTE}/productImages/${items?.product?.picture[0]?.imageUrl}`}
                    />
                  </Box>
                  <Box
                    w={'full'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                  >
                    <Text
                      fontFamily={'nunito'}
                      fontWeight={'600'}
                      fontSize={'14px'}
                      cursor={'pointer'}
                      onClick={() => navigate('/cart')}
                    >
                      {items?.product?.name}
                    </Text>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                      <Text fontFamily={'nunito'} fontWeight={'400'} fontSize={'12px'}>
                        S, Dark Blue (2 items)
                      </Text>
                      <Text
                        fontFamily={'nunito'}
                        fontWeight={'700'}
                        fontSize={'14px'}
                        color={'#CD0244'}
                      >
                        {toRupiah(items?.price, { floatingPoint: 0 })}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </PopoverBody>
        <PopoverFooter
          border={'none'}
          bgColor={'#FFF1F5'}
          borderBottomRadius={'12px'}
          textAlign={'center'}
          fontFamily={'nunito'}
          fontWeight={'700'}
          fontSize={'12px'}
          color={'#CD0244'}
          cursor={'pointer'}
          onClick={() => navigate('/cart')}
        >
          Show All Shopping Cart
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

export default ShoppingCartBox
