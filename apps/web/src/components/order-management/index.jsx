import React, { useEffect, useState } from 'react'
import { Box, Text, Button, ButtonGroup, Icon, Input, Collapse } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import NewOrderTable from './order-management-table/new-orders-table'
import CustomTabList from './custom-tablist'
import useOrderManagementState from './service/useOrderManagementState'
import NewOrder from './order-card/new-order'
import BreadcrumbNav from './breadcrumbnav'
import Search from './search'
import DateFilter from './date-filter'
import MobileMenu from './mobile-menu'
import Pagination from './pagination'
import OnProcess from './order-card/on-process'
import OnProcessTable from './order-management-table/on-process-table'
import OnDeliveryTable from './order-management-table/on-delivery-table'
import OnDelivery from './order-card/on-delivery'
import OrderConfirmedTable from './order-management-table/order-confirmed-table'
import OrderConfirmed from './order-card/order-confirmed'
import OrderCancelledTable from './order-management-table/order-cancelled-table'
import OrderCancelled from './order-card/order-cancelled'

const OrderManagementBody = ({
  orderData,
  warehouseData,
  onOrderNumberSubmit,
  onOrderDateSubmit,
  onWarehouseSubmit,
  onTabClick,
  onPageChange,
  pagination,
}) => {
  const {
    newOrder,
    onProcess,
    expandedProducts,
    orderNumber,
    orderDate,
    selectedWarehouse,
    isMobile,
    isTabListVisible,
    handleToggleProducts,
    handleAcceptButton,
    handleRejectButton,
    handleToggleTabList,
    handleOrderNumberChange,
    handleOrderDateChange,
    handleOrderNumberSubmit,
    handleOrderNumberKeyPress,
    handleSelectWarehouseChange,
  } = useOrderManagementState({
    orderData,
    onOrderNumberSubmit,
    onOrderDateSubmit,
    onWarehouseSubmit,
  })

  return (
    <Box display={'flex'}>
      <Box w={{ base: 'none', xl: '15vw' }} minH={'100vh'} bgColor={'white'}></Box>
      <Box w={{ base: 'full', xl: '85vw' }} minH={'100vh'} padding={'24px'}>
        <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Text fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
              Order Management
            </Text>
            <Box display={{ base: 'none', xl: 'flex' }} alignItems={'center'} gap={'16px'}>
              <Search
                orderNumber={orderNumber}
                handleOrderNumberChange={handleOrderNumberChange}
                handleOrderNumberKeyPress={handleOrderNumberKeyPress}
                handleOrderNumberSubmit={handleOrderNumberSubmit}
              />
              <Box bgColor={'white'} w={'250px'} padding={'4px 12px 4px 8px'} borderRadius={'8px'}>
                <Select
                  placeholder="Warehouse Name"
                  border={'none'}
                  value={selectedWarehouse}
                  onChange={handleSelectWarehouseChange}
                >
                  {warehouseData.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <DateFilter orderDate={orderDate} handleOrderDateChange={handleOrderDateChange} />
            </Box>
          </Box>
          <BreadcrumbNav />
          <Box display={{ base: 'flex', xl: 'none' }} alignItems={'center'} gap={'16px'}>
            <Search
              orderNumber={orderNumber}
              handleOrderNumberChange={handleOrderNumberChange}
              handleOrderNumberKeyPress={handleOrderNumberKeyPress}
              handleOrderNumberSubmit={handleOrderNumberSubmit}
            />
            <Box bgColor={'white'} w={'250px'} padding={'4px 12px 4px 8px'} borderRadius={'8px'}>
              <Select
                placeholder="Warehouse Name"
                border={'none'}
                value={selectedWarehouse}
                onChange={handleSelectWarehouseChange}
              >
                {warehouseData.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </Select>
            </Box>
            <DateFilter orderDate={orderDate} handleOrderDateChange={handleOrderDateChange} />
          </Box>
          <MobileMenu
            isMobile={isMobile}
            isTabListVisible={isTabListVisible}
            handleToggleTabList={handleToggleTabList}
          />
          <Tabs>
            <CustomTabList
              isTabListVisible={isTabListVisible}
              onTabClick={onTabClick}
              isMobile={isMobile}
            />
            <TabPanels>
              {/* New Order */}
              <TabPanel padding={{ base: '16px 0 16px 0', xl: '16px' }}>
                <NewOrder
                  newOrder={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                />
                <NewOrderTable
                  orderData={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                />
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={onPageChange}
                />
              </TabPanel>
              {/* On Process */}
              <TabPanel>
                <OnProcess
                  onProcessOrders={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                />
                <OnProcessTable
                  orderData={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                />
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={onPageChange}
                />
              </TabPanel>
              <TabPanel>
                <OnDelivery
                  onDeliveryOrders={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                />
                <OnDeliveryTable
                  orderData={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                />
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={onPageChange}
                />
              </TabPanel>
              <TabPanel>
                <OrderConfirmed
                  orderConfirmedOrders={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                />
                <OrderConfirmedTable
                  orderData={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                />
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={onPageChange}
                />
              </TabPanel>
              <TabPanel>
                <OrderCancelled
                  orderCancelledOrders={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                />
                <OrderCancelledTable
                  orderData={orderData}
                  expandedProducts={expandedProducts}
                  handleToggleProducts={handleToggleProducts}
                  handleAcceptButton={handleAcceptButton}
                  handleRejectButton={handleRejectButton}
                />
                <Pagination
                  currentPage={pagination?.currentPage}
                  totalPages={pagination?.totalPages}
                  onPageChange={onPageChange}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  )
}
export default OrderManagementBody
