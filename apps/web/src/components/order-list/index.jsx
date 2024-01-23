import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

const OrderListBody = ({ orderData, loading }) => {
  // console.log('orderData', orderData)
  const location = useLocation();
  const navigate = useNavigate()
  const [sortedOrderData, setSortedOrderData] = useState([]);
  // const [activeTab, setActiveTab] = useState(
  //   location.state && location.state.activeTab !== undefined ? location.state.activeTab : 0
  // );
  const [activeTab, setActiveTab] = useState(() => {
    const storedTab = localStorage.getItem('activeTab');
    return location.state?.activeTab || 0;
  });

  const handlePayNowClick = (orderId) => {
    const orderToPay = orderData.find((order) => order.id === orderId);
    if (orderToPay) {
      navigate('/payment', { state: { orderData: [orderToPay] } });
    } else {
      console.error('Order not found.');
    }
  };
  useEffect(() => {
    if (orderData && orderData.length > 0 && orderData[0].orderDate) {
      // Sort orderData based on the orderDate in descending order
      const sortedData = [...orderData].sort((a, b) => {
        const dateA = new Date(a.orderDate).getTime();
        const dateB = new Date(b.orderDate).getTime();
        return dateB - dateA;
      });
  
      // Update sortedOrderData with the sorted data
      setSortedOrderData(sortedData);
    }
  }, [orderData, loading]);

  const waitingPaymentOrders = sortedOrderData?.filter(
    (order) => order?.Payment?.paymentStatus === 'pending',
  );

  const onProcessOrders = sortedOrderData?.filter(
    (order) => order?.Payment?.paymentStatus === 'settlement',
  );

  const handleTabChange = (index) => {
    setActiveTab(index);
    navigate('.', { state: { activeTab: index } });
  };

  return (
    <Box padding={'24px'}>
      <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
        Transactions
      </Text>
      <Box>
        <Tabs index={activeTab} onChange={handleTabChange}>
          <TabList>
            <Tab
              fontFamily={'heading'}
              fontWeight={'600'}
              fontSize={'16px'}
              color={'#838383'}
              _selected={{
                color: '#CD0244',
                borderColor: '#CD0244',
                // bg: '#FED7E2',
              }}
            >
              Waiting Payment
            </Tab>
            <Tab
              fontFamily={'heading'}
              fontWeight={'600'}
              fontSize={'16px'}
              color={'#838383'}
              _selected={{
                color: '#CD0244',
                borderColor: '#CD0244',
                // bg: '#FED7E2',
              }}
            >
              On Process
            </Tab>
            <Tab
              fontFamily={'heading'}
              fontWeight={'600'}
              fontSize={'16px'}
              color={'#838383'}
              _selected={{
                color: '#CD0244',
                borderColor: '#CD0244',
                // bg: '#FED7E2',
              }}
            >
              On Delivery
            </Tab>
            <Tab
              fontFamily={'heading'}
              fontWeight={'600'}
              fontSize={'16px'}
              color={'#838383'}
              _selected={{
                color: '#CD0244',
                borderColor: '#CD0244',
                // bg: '#FED7E2',
              }}
            >
              Order Confirmed
            </Tab>
            <Tab
              fontFamily={'heading'}
              fontWeight={'600'}
              fontSize={'16px'}
              color={'#838383'}
              _selected={{
                color: '#CD0244',
                borderColor: '#CD0244',
                // bg: '#FED7E2',
              }}
            >
              Order Cancelled
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel className={'waiting-payment'}>
              <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
                {waitingPaymentOrders.map((order) => (
                  <Box
                    key={order.id}
                    bgColor={'white'}
                    w={'full'}
                    h={'246px'}
                    padding={'16px'}
                    borderRadius={'12px'}
                  >
                    <Box display={'flex'} flexDirection={'column'} gap={'12px'}>
                      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                          <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                            {order?.orderDate}
                          </Text>
                          <Box bgColor={'#E8E7E7'} w={'8px'} h={'8px'} borderRadius={'50%'} />
                          <Text
                            color={'#838383'}
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'14px'}
                          >
                            No. Order {order?.orderNumber}
                          </Text>
                        </Box>
                        <Box
                          bgColor={'#FFF1F5'}
                          w={'130px'}
                          h={'38px'}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          borderRadius={'8px'}
                        >
                          <Text
                            color={'#CD0244'}
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'14px'}
                          >
                            Waiting Payment
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems={'flex-end'}
                        justifyContent={'space-between'}
                      >
                        <Box display={'flex'} gap={'16px'}>
                          <Box bgColor={'brand.grey100'} w={'112px'} h={'112px'}></Box>
                          <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {order?.OrderProducts[0]?.Stock?.Product?.name}
                            </Text>
                            <Text
                              fontFamily={'body'}
                              fontWeight={'600'}
                              fontSize={'14px'}
                              color={'#838383'}
                            >
                              S, Dark Blue
                            </Text>
                            <Text
                              fontFamily={'body'}
                              fontWeight={'600'}
                              fontSize={'14px'}
                              color={'#838383'}
                            >
                              {order?.OrderProducts[0]?.quantity} item x Rp{' '}
                              {order?.OrderProducts[0]?.price}
                            </Text>
                            <Box>
                              <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                                + 2 more products
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'14px'}
                            color={'#838383'}
                          >
                            Total Price
                          </Text>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'16px'}
                            color={'#CD0244'}
                          >
                            Rp {order?.totalPrice}
                          </Text>
                        </Box>
                      </Box>
                      <Box w={'full'} display={'flex'} justifyContent={'flex-end'} gap={'16px'}>
                        <Button bgColor={'white'} color={'#CD0244'} border={'1px solid #CD0244'}>
                          Cancel Order
                        </Button>
                        <Button
                          bgColor={'#CD0244'}
                          color={'white'}
                          onClick={() => handlePayNowClick(order.id)}
                        >
                          Pay Now
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </TabPanel>
            <TabPanel className={'on-process'}>
              <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
                {onProcessOrders.map((order) => (
                  <Box
                    key={order.id}
                    bgColor={'white'}
                    w={'full'}
                    h={'246px'}
                    padding={'16px'}
                    borderRadius={'12px'}
                  >
                    <Box display={'flex'} flexDirection={'column'} gap={'12px'}>
                      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                        <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                          <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                            {order?.orderDate}
                          </Text>
                          <Box bgColor={'#E8E7E7'} w={'8px'} h={'8px'} borderRadius={'50%'} />
                          <Text
                            color={'#838383'}
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'14px'}
                          >
                            Order ID {order?.orderNumber}
                          </Text>
                        </Box>
                        <Box
                          bgColor={'#FFF1F5'}
                          w={'130px'}
                          h={'38px'}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          borderRadius={'8px'}
                        >
                          <Text
                            color={'#CD0244'}
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'14px'}
                          >
                            On Process
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        display={'flex'}
                        alignItems={'flex-end'}
                        justifyContent={'space-between'}
                      >
                        <Box display={'flex'} gap={'16px'}>
                          <Box bgColor={'brand.grey100'} w={'112px'} h={'112px'}></Box>
                          <Box display={'flex'} flexDirection={'column'} gap={'6px'}>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                              {order?.OrderProducts[0]?.Stock?.Product?.name}
                            </Text>
                            <Text
                              fontFamily={'body'}
                              fontWeight={'600'}
                              fontSize={'14px'}
                              color={'#838383'}
                            >
                              S, Dark Blue
                            </Text>
                            <Text
                              fontFamily={'body'}
                              fontWeight={'600'}
                              fontSize={'14px'}
                              color={'#838383'}
                            >
                              {order?.OrderProducts[0]?.quantity} item x Rp{' '}
                              {order?.OrderProducts[0]?.price}
                            </Text>
                            <Box>
                              <Text fontFamily={'body'} fontWeight={'600'} fontSize={'14px'}>
                                + 2 more products
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'14px'}
                            color={'#838383'}
                          >
                            Total Price
                          </Text>
                          <Text
                            fontFamily={'body'}
                            fontWeight={'700'}
                            fontSize={'16px'}
                            color={'#CD0244'}
                          >
                            Rp {order?.totalPrice}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </TabPanel>
            <TabPanel className={'on-delivery'}>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}
export default OrderListBody
