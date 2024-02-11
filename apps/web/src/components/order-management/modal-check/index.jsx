import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'

const ModalCheck = ({ checkStock, isOpen, onClose, handleAcceptButton }) => {
  const insufficientStockItems = checkStock.filter((item) => item.status === 'Insufficient Stock')
  const availableStockItems = checkStock.filter((item) => item.status === 'Available')
  const hasInsufficientStock = insufficientStockItems.length > 0
  const hasAvailableStock = availableStockItems.length > 0
  const handleAccept = (orderId) => {
    handleAcceptButton(orderId)
    onClose() // Tutup modal setelah aksi diterima
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={'0 12px 0 12px'}>
        <ModalHeader>Check Stock</ModalHeader>
        <ModalCloseButton />
        <ModalBody bgColor={'white'}>
          {hasInsufficientStock && (
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Products with Insufficient Stock:
              </Text>
              {insufficientStockItems.map((item, index) => (
                <Box key={index}>
                  <Text>Stock ID: {item.stockId}</Text>
                  <Text>Product ID: {item.productId}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>Status: {item.status}</Text>
                  <Box>
                    <Text>
                      Need to move {item.needSelectedWarehouseQuantity} items to nearest warehouse (
                      {item.nearestWarehouse.name}).
                    </Text>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
          {hasAvailableStock && (
            <Box mt={4}>
              <Text fontSize="xl" fontWeight="bold">
                Other Products with Available Stock:
              </Text>
              {availableStockItems.map((item, index) => (
                <Box key={index}>
                  <Text>Stock ID: {item.stockId}</Text>
                </Box>
              ))}
            </Box>
          )}
          {!hasInsufficientStock && !hasAvailableStock && (
            <Text fontSize="xl" fontWeight="bold">
              All Products are Out of Stock
            </Text>
          )}
          <Text mt={4}>Are you authorizing this action?</Text>
        </ModalBody>

        <ModalFooter gap={'16px'}>
          <Button onClick={onClose}>Close</Button>
          <Button
            bgColor={'#CD0244'}
            color={'white'}
            onClick={() => handleAccept(checkStock[0].orderId)}
          >
            Accept
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalCheck
