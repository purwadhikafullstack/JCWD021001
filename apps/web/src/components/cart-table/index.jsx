import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import useCartState from './service/useCartState'
import CartProductRow from './cartProductRow'
import CartProductRowMobile from './cartProductRowMobile'
import CartSummary from './cartSummary'
import CartSummaryMobile from './cartSummaryMobile'

const LaptopCartTable = ({ cartData, onCartUpdated }) => {
  const {
    selectedCartProducts,
    selectAllChecked,
    productData,
    handleButtonClick,
    handleDeleteButtonClick,
    handleCheckboxChange,
    handleSelectAllChange,
    totalPrice,
    totalQuantity,
    handleCheckout,
  } = useCartState(cartData, onCartUpdated)

  return (
    <Box>
      <Box padding={'24px'} display={{ base: 'none', xl: 'block' }}>
        <Text mb={'8px'} fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
          Shopping Cart
        </Text>
        {cartData?.map((cartItem) => (
          <Box key={cartItem.id} display={'flex'} gap={'16px'} justifyContent={'center'}>
            <CartProductRow
              cartItem={cartItem}
              selectedCartProducts={selectedCartProducts}
              selectAllChecked={selectAllChecked}
              handleButtonClick={handleButtonClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectAllChange={handleSelectAllChange}
              productData={productData}
            />
            <CartSummary
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
              handleCheckout={handleCheckout}
            />
          </Box>
        ))}
      </Box>
      <Box display={{ base: 'block', xl: 'none' }}>
        {cartData?.map((cartItem) => (
          <Box key={cartItem.id}>
            <CartProductRowMobile
              cartItem={cartItem}
              selectedCartProducts={selectedCartProducts}
              selectAllChecked={selectAllChecked}
              handleButtonClick={handleButtonClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleCheckboxChange={handleCheckboxChange}
              handleSelectAllChange={handleSelectAllChange}
              productData={productData}
            />
            <CartSummaryMobile
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
              handleCheckout={handleCheckout}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default LaptopCartTable
