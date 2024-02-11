import React from 'react'
import { Box, Text, Tabs, TabPanels, TabPanel } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import WaitingPayment from './waiting-payment'
import OnProcess from './on-process'
import OnDelivery from './on-delivery'
import OrderConfirmed from './order-confirmed'
import OrderCancelled from './order-cancelled'
import useOrderListState from './services/useOrderListState'
import Pagination from './pagination'
import CustomTabList from './custom-tablist'
import Search from './search'
import DateFilter from './date-filter'
import BreadcrumbNav from './breadcrumbnav'
import MobileMenu from './mobile-menu'

const OrderListBody = ({
  orderData,
  loading,
  onOrderNumberSubmit,
  onOrderDateSubmit,
  onTabClick,
  onPageChange,
  pagination,
  refreshOrder,
}) => {
  const navigate = useNavigate()
  const {
    activeTab,
    expandedProducts,
    isTabListVisible,
    isMobile,
    orderNumber,
    orderDate,
    handlePayNowClick,
    handleTabChange,
    handleToggleProducts,
    handleToggleTabList,
    handleOrderNumberChange,
    handleOrderDateChange,
    handleOrderNumberSubmit,
    handleOrderNumberKeyPress,
    formatDate,
    handleConfirmButton,
    handleCancelButton,
    handleTabClick,
  } = useOrderListState({
    orderData,
    loading,
    onOrderNumberSubmit,
    onOrderDateSubmit,
    refreshOrder,
    onTabClick,
  })
  return (
    <Box padding={'24px'}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
          Transactions
        </Text>
        {/* search and filter */}
        <Box display={{ base: 'none', xl: 'flex' }} alignItems={'center'} gap={'16px'}>
          <Search
            orderNumber={orderNumber}
            handleOrderNumberChange={handleOrderNumberChange}
            handleOrderNumberKeyPress={handleOrderNumberKeyPress}
            handleOrderNumberSubmit={handleOrderNumberSubmit}
          />
          <DateFilter orderDate={orderDate} handleOrderDateChange={handleOrderDateChange} />
        </Box>
      </Box>
      {/* breadcrumb */}
      <BreadcrumbNav />
      <Box mt={'15px'} display={{ base: 'flex', xl: 'none' }} alignItems={'center'} gap={'16px'}>
        <Search
          orderNumber={orderNumber}
          handleOrderNumberChange={handleOrderNumberChange}
          handleOrderNumberKeyPress={handleOrderNumberKeyPress}
          handleOrderNumberSubmit={handleOrderNumberSubmit}
        />
        <DateFilter orderDate={orderDate} handleOrderDateChange={handleOrderDateChange} />
      </Box>
      {/* body */}
      <Box mt={'15px'}>
        {/* menu burger tablist mobile*/}
        <MobileMenu
          isMobile={isMobile}
          isTabListVisible={isTabListVisible}
          handleToggleTabList={handleToggleTabList}
        />
        <Tabs index={activeTab} onChange={handleTabChange}>
          {/* tablist */}
          <CustomTabList
            isTabListVisible={isTabListVisible}
            // onTabClick={onTabClick}
            handleTabClick={handleTabClick}
            isMobile={isMobile}
          />
          {/* tabpanel */}
          <TabPanels>
            <TabPanel className={'waiting-payment'} padding={{ base: '16px 0 16px 0', xl: '16px' }}>
              <WaitingPayment
                waitingPaymentOrders={orderData}
                formatDate={formatDate}
                handlePayNowClick={handlePayNowClick}
                expandedProducts={expandedProducts}
                handleToggleProducts={handleToggleProducts}
                handleCancelButton={handleCancelButton}
                navigate={navigate}
              />
              <Pagination
                currentPage={pagination?.currentPage}
                totalPages={pagination?.totalPages}
                onPageChange={onPageChange}
              />
            </TabPanel>
            <TabPanel className={'on-process'} padding={{ base: '16px 0 16px 0', xl: '16px' }}>
              <OnProcess
                onProcessOrders={orderData}
                formatDate={formatDate}
                expandedProducts={expandedProducts}
                handleToggleProducts={handleToggleProducts}
                navigate={navigate}
              />
              <Pagination
                currentPage={pagination?.currentPage}
                totalPages={pagination?.totalPages}
                onPageChange={onPageChange}
              />
            </TabPanel>
            <TabPanel className={'on-delivery'} padding={{ base: '16px 0 16px 0', xl: '16px' }}>
              <OnDelivery
                onDeliveryOrders={orderData}
                formatDate={formatDate}
                expandedProducts={expandedProducts}
                handleToggleProducts={handleToggleProducts}
                handleConfirmButton={handleConfirmButton}
                navigate={navigate}
              />
              <Pagination
                currentPage={pagination?.currentPage}
                totalPages={pagination?.totalPages}
                onPageChange={onPageChange}
              />
            </TabPanel>
            <TabPanel className={'order-confirmed'} padding={{ base: '16px 0 16px 0', xl: '16px' }}>
              <OrderConfirmed
                onConfirmedOrders={orderData}
                formatDate={formatDate}
                expandedProducts={expandedProducts}
                handleToggleProducts={handleToggleProducts}
                navigate={navigate}
              />
              <Pagination
                currentPage={pagination?.currentPage}
                totalPages={pagination?.totalPages}
                onPageChange={onPageChange}
              />
            </TabPanel>
            <TabPanel className={'order-cancelled'} padding={{ base: '16px 0 16px 0', xl: '16px' }}>
              <OrderCancelled
                onCancelledOrders={orderData}
                formatDate={formatDate}
                expandedProducts={expandedProducts}
                handleToggleProducts={handleToggleProducts}
                navigate={navigate}
              />
              <Pagination
                currentPage={pagination?.currentPage}
                totalPages={pagination?.totalPages}
                onPageChange={onPageChange}
              />
            </TabPanel>
            <TabPanel
              className={'on-delivery'}
              padding={{ base: '16px 0 16px 0', xl: '16px' }}
            ></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  )
}
export default OrderListBody
