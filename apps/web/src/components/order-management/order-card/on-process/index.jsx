import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon, Input, Collapse } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import toRupiah from '@develoka/angka-rupiah-js'

const OnProcess = ({
  onProcessOrders,
  expandedProducts,
  handleToggleProducts,
  handleSendButton,
  handleCanceltOnProcess
}) => {
  const navigate = useNavigate()
  return (
    <Box display={{ base: 'flex', xl: 'none' }} flexDirection={'column'} gap={'16px'}>
      {onProcessOrders?.map((items) => (
        <Box
          key={items.id}
          w={'full'}
          h={'fit-content'}
          bgColor={'white'}
          borderRadius={'12px'}
          padding={'16px'}
        >
          <Box display={'flex'} flexDirection={'column'} gap={'12px'}>
            <Box
              display={'flex'}
              alignItems={{ base: 'normal', xl: 'center' }}
              justifyContent={'space-between'}
            >
              <Box
                display={'flex'}
                alignItems={{ base: 'normal', xl: 'center' }}
                gap={'12px'}
                flexDirection={{ base: 'column', xl: 'row' }}
              >
                <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                  {items?.orderDate}
                </Text>
                <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                  <Box bgColor={'#E8E7E7'} minW={'8px'} h={'8px'} borderRadius={'50%'} />
                  <Text
                    color={'#838383'}
                    fontFamily={'body'}
                    fontWeight={'600'}
                    fontSize={'14px'}
                    cursor={'pointer'}
                    onClick={() => navigate('/order-management/details')}
                  >
                    No. Order {items?.orderNumber}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              display={'flex'}
              alignItems={{ base: 'normal', xl: 'flex-end' }}
              justifyContent={'space-between'}
              flexDirection={{ base: 'column', xl: 'row' }}
            >
              <Box
                className="product"
                display={'flex'}
                gap={'16px'}
                flexDirection={{ base: 'column', xl: 'row' }}
              >
                <Box display={'flex'} gap={'16px'}>
                  <Box
                    bgColor={'brand.grey100'}
                    w={'112px'}
                    h={'112px'}
                    cursor={'pointer'}
                    onClick={() => navigate('/order-management/details')}
                  ></Box>
                  <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'14px'}
                      cursor={'pointer'}
                      onClick={() => navigate('/order-management/details')}
                    >
                      {items?.OrderProducts[0]?.stocks?.product?.name}
                    </Text>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      {items?.OrderProducts[0]?.stocks?.size?.name},{' '}
                      {items?.OrderProducts[0]?.stocks?.colour?.name}
                    </Text>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      {items?.OrderProducts[0]?.quantity} item x{' '}
                      {toRupiah(+items?.OrderProducts[0]?.stocks?.product?.price, {
                        floatingPoint: 0,
                      })}
                    </Text>
                    {items?.OrderProducts.length > 1 && (
                      <Box>
                        <Text
                          fontFamily={'body'}
                          fontWeight={'600'}
                          fontSize={'14px'}
                          onClick={() => handleToggleProducts(items.id)}
                          color="#CD0244"
                          cursor="pointer"
                        >
                          {expandedProducts[items?.id]
                            ? '- Less Products'
                            : `+ More Products (${items?.OrderProducts.length - 1})`}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Collapse in={expandedProducts[items.id]}>
                  <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
                    {items?.OrderProducts.slice(1).map((product, index) => (
                      <Box display={'flex'} gap={'16px'} key={index}>
                        <Box bgColor={'brand.grey100'} w={'112px'} h={'112px'}></Box>
                        <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
                          <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                            {product?.stocks?.product?.name}
                          </Text>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'14px'}
                            color={'#838383'}
                          >
                            {product?.stocks?.size?.name}, {product?.stocks?.colour?.name}
                          </Text>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'14px'}
                            color={'#838383'}
                          >
                            {product?.quantity} item x{' '}
                            {toRupiah(+product?.stocks?.product?.price, {
                              floatingPoint: 0,
                            })}
                          </Text>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
              <Box
                className="price"
                display={'flex'}
                flexDirection={'column'}
                alignItems={'flex-end'}
              >
                <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'} color={'#838383'}>
                  Total Price
                </Text>
                <Text fontFamily={'body'} fontWeight={'700'} fontSize={'16px'} color={'#CD0244'}>
                  {toRupiah(+items?.totalPrice, { floatingPoint: 0 })}
                </Text>
              </Box>
            </Box>
            <Box w={'full'} display={'flex'} justifyContent={'flex-end'} gap={'16px'}>
              <Button
                bgColor={'white'}
                color={'#CD0244'}
                border={'1px solid #CD0244'}
                onClick={() => handleCanceltOnProcess(items?.id)}
              >
                Cancel
              </Button>
              <Button
                bgColor={'#CD0244'}
                color={'white'}
                onClick={() => handleSendButton(items?.id)}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
export default OnProcess
