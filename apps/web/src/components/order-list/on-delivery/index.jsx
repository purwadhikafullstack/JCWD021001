import React from 'react'
import { Box, Text, Button, Collapse } from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'

const OnDelivery = ({
  onDeliveryOrders,
  formatDate,
  expandedProducts,
  handleToggleProducts,
  handleConfirmButton,
  navigate,
}) => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
      {onDeliveryOrders?.map((order) => (
        <Box
          key={order.id}
          bgColor={'white'}
          w={'full'}
          h={{ base: 'fit-content', xl: 'fit-content' }}
          padding={'16px'}
          borderRadius={'12px'}
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
                  {formatDate(order?.orderDate)}
                </Text>
                <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                  <Box bgColor={'#E8E7E7'} minW={'8px'} h={'8px'} borderRadius={'50%'} />
                  <Text color={'#838383'} fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                    No. Order {order?.orderNumber}
                  </Text>
                </Box>
              </Box>
              <Box
                bgColor={'#FFF1F5'}
                w={'130px'}
                h={'38px'}
                display={{ base: 'none', xl: 'flex' }}
                alignItems={'center'}
                justifyContent={'center'}
                borderRadius={'8px'}
              >
                <Text color={'#CD0244'} fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                  {order?.OrderStatus?.name}
                </Text>
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
                flexDirection={{ base: 'column', xl: 'column' }}
              >
                <Box display={'flex'} gap={'16px'}>
                  <Box
                    bgColor={'brand.grey100'}
                    w={'112px'}
                    h={'112px'}
                    cursor={'pointer'}
                    onClick={() => navigate('/order-details')}
                  ></Box>
                  <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'14px'}
                      cursor={'pointer'}
                      onClick={() => navigate('/order-details')}
                    >
                      {order?.OrderProducts[0]?.stocks?.product?.name}
                    </Text>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      {order?.OrderProducts[0]?.stocks?.size?.name},{' '}
                      {order?.OrderProducts[0]?.stocks?.colour?.name}
                    </Text>
                    <Text
                      fontFamily={'body'}
                      fontWeight={'600'}
                      fontSize={'14px'}
                      color={'#838383'}
                    >
                      {order?.OrderProducts[0]?.quantity} item x{' '}
                      {toRupiah(+order?.OrderProducts[0]?.stocks?.product?.price, {
                        floatingPoint: 0,
                      })}
                    </Text>
                    {order.OrderProducts.length > 1 && (
                      <Box>
                        <Text
                          fontFamily={'body'}
                          fontWeight={'600'}
                          fontSize={'14px'}
                          onClick={() => handleToggleProducts(order?.id)}
                          color="#CD0244"
                          cursor="pointer"
                        >
                          {expandedProducts[order?.id]
                            ? '- Less Products'
                            : `+ More Products (${order?.OrderProducts?.length - 1})`}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Collapse in={expandedProducts[order.id]}>
                  <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
                    {order.OrderProducts.slice(1).map((product, index) => (
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
                            {toRupiah(+product?.stocks?.product?.price, { floatingPoint: 0 })}
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
                  {toRupiah(+order?.Payment?.grossAmount, { floatingPoint: 0 })}
                </Text>
              </Box>
            </Box>
            <Box w={'full'} display={'flex'} justifyContent={'flex-end'} gap={'16px'}>
              {/* <Button bgColor={'white'} color={'#CD0244'} border={'1px solid #CD0244'}>
                Cancel Order
              </Button> */}
              <Button
                bgColor={'#CD0244'}
                color={'white'}
                onClick={() => handleConfirmButton(order.id)}
              >
                Confirm Order
              </Button>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default OnDelivery
