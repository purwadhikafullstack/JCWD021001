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
  ClockIcon,
  ArrowPathIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const NotificationBox = () => {
  const navigate = useNavigate()
  return (
    <Popover>
      <PopoverTrigger>
        <Box cursor={'pointer'}>
          <Icon as={BellIcon} boxSize={'24px'} />
          {/* {cartCount > 0 && (
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
          )} */}
        </Box>
      </PopoverTrigger>
      <PopoverContent borderRadius={'12px'} w={'fit-content'}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text fontFamily={'nunito'} fontWeight={'700'} fontSize={'18px'}>
            Notification
          </Text>
        </PopoverHeader>
        <PopoverBody padding={'18px'}>
          <Box display={'flex'} alignItems={'center'} gap={'14px'}>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              gap={'6px'}
              cursor={'pointer'}
              onClick={() =>
                navigate('/order-list', { state: { refresh: true, activeTab: 0, status: [1] } })
              }
            >
              <Box
                w={'44px'}
                h={'44px'}
                bgColor={'#FFF1F5'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius={'50%'}
              >
                <Icon as={ClockIcon} boxSize={'24px'} color={'#CD0244'} />
              </Box>
              <Text fontFamily={'nunito'} fontWeight={'600'} fontSize={'12px'} textAlign={'center'}>
                Waiting
                <br />
                Payment
              </Text>
            </Box>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems={'center'}
              gap={'6px'}
              cursor={'pointer'}
              onClick={() =>
                navigate('/order-list', { state: { refresh: true, activeTab: 1, status: [2, 3] } })
              }
            >
              <Box
                w={'44px'}
                h={'44px'}
                bgColor={'#FFF1F5'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius={'50%'}
              >
                <Icon as={ArrowPathIcon} boxSize={'24px'} color={'#CD0244'} />
              </Box>
              <Text fontFamily={'nunito'} fontWeight={'600'} fontSize={'12px'} textAlign={'center'}>
                On
                <br />
                Process
              </Text>
            </Box>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'6px'}>
              <Box
                w={'44px'}
                h={'44px'}
                bgColor={'#FFF1F5'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius={'50%'}
              >
                <Icon as={TruckIcon} boxSize={'24px'} color={'#CD0244'} />
              </Box>
              <Text fontFamily={'nunito'} fontWeight={'600'} fontSize={'12px'} textAlign={'center'}>
                On
                <br />
                Delivery
              </Text>
            </Box>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'6px'}>
              <Box
                w={'44px'}
                h={'44px'}
                bgColor={'#FFF1F5'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius={'50%'}
              >
                <Icon as={CheckCircleIcon} boxSize={'24px'} color={'#CD0244'} />
              </Box>
              <Text fontFamily={'nunito'} fontWeight={'600'} fontSize={'12px'} textAlign={'center'}>
                Order
                <br />
                Confirmed
              </Text>
            </Box>
            <Box display={'flex'} flexDirection={'column'} alignItems={'center'} gap={'6px'}>
              <Box
                w={'44px'}
                h={'44px'}
                bgColor={'#FFF1F5'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius={'50%'}
              >
                <Icon as={XCircleIcon} boxSize={'24px'} color={'#CD0244'} />
              </Box>
              <Text fontFamily={'nunito'} fontWeight={'600'} fontSize={'12px'} textAlign={'center'}>
                Order
                <br />
                Cancelled
              </Text>
            </Box>
          </Box>
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
          onClick={() =>
            navigate('/order-list', { state: { refresh: true, activeTab: 0, status: [1] } })
          }
        >
          Show All Notifications
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}
export default NotificationBox
