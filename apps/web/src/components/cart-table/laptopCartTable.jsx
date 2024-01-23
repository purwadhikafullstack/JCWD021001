import { Box, Text, Button, Icon, ButtonGroup, Checkbox, Select } from '@chakra-ui/react'
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { updateCart } from '../../pages/cart/services/updateCart'
import { useState, useEffect, useCallback } from 'react'
import { deleteCart } from '../../pages/cart/services/deleteCart'
import toRupiah from '@develoka/angka-rupiah-js'
import _debounce from 'lodash/debounce'

const LaptopCartTable = ({ cartData, onCartUpdated }) => {
  const [selectedCartProducts, setSelectedCartProducts] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [productData, setProductData] = useState(() => {
    const storedProductData = localStorage.getItem('productData')
    return storedProductData ? JSON.parse(storedProductData) : {}
  })
  const [dataLoaded, setDataLoaded] = useState(false);

  const updateProductData = (newProductData) => {
    // Update state dan simpan ke localStorage
    setProductData(newProductData)
    localStorage.setItem('productData', JSON.stringify(newProductData))
  }

  const debouncedUpdateCart = useCallback(
    _debounce(async (productId, newQuantity) => {
      // Menggunakan total akumulasi sebagai argumen
      await updateCart(productId, newQuantity, onCartUpdated)
    }, 800),
    [onCartUpdated],
  )

  const handleButtonClick = (productId, change) => {
    setProductData((prevData) => {
      const currentQuantity = prevData[productId]?.quantity || 1
      let newQuantity

      if (change === -1) {
        // Decrement button clicked
        newQuantity = Math.max(1, currentQuantity + change)
      } else {
        // Increment button clicked
        newQuantity = Math.min(10, currentQuantity + change)
      }

      // Menyimpan data ke localStorage
      const newProductData = {
        ...prevData,
        [productId]: {
          quantity: newQuantity,
          accumulatedChange: (prevData[productId]?.accumulatedChange || 0) + change,
        },
      }

      updateProductData(newProductData)

      // Memanggil fungsi debounce dengan menyertakan accumulatedChange dan newQuantity
      debouncedUpdateCart(productId, newQuantity)

      return newProductData
    })
  }

  useEffect(() => {
    // Set dataLoaded to true when cartData is available
    if (cartData.length > 0 && !dataLoaded) {
      setDataLoaded(true);
    }
  }, [cartData, dataLoaded]);


  useEffect(() => {
    // Load checkbox states from localStorage once data is loaded
    if (dataLoaded) {
      const storedSelectAllChecked = localStorage.getItem('selectAllChecked');
      const storedSelectedCartProducts = localStorage.getItem('selectedCartProducts');
  
      if (storedSelectAllChecked) {
        setSelectAllChecked(JSON.parse(storedSelectAllChecked));
      }
  
      if (storedSelectedCartProducts) {
        setSelectedCartProducts((prevSelected) => {
          // Set to all product IDs only if selectAllChecked is true
          return JSON.parse(storedSelectAllChecked) ? 
            cartData.flatMap((cartItem) => cartItem.CartProducts.map((item) => item.id)) :
            JSON.parse(storedSelectedCartProducts);
        });
      }
    }
  }, [dataLoaded, cartData]);

  const handleDeleteButtonClick = () => {
    // Check if there are selected products to delete
    if (selectedCartProducts.length > 0) {
      // Perform deletion of selected products
      deleteCart(selectedCartProducts, onCartUpdated);

      // Remove deleted products from selectedCartProducts state
      setSelectedCartProducts([]);
      
      // Update the local storage
      localStorage.removeItem('selectedCartProducts');
      localStorage.removeItem('selectAllChecked');
    }
  };

  const handleCheckboxChange = (productId) => {
    setSelectedCartProducts((prevSelected) => {
      const newSelected = prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId];
  
      // Check if all products are selected
      const allProductsSelected = cartData.every((cartItem) =>
        cartItem.CartProducts.every((product) => newSelected.includes(product.id))
      );
  
      setSelectAllChecked(allProductsSelected);
  
      // Save to localStorage
      localStorage.setItem('selectedCartProducts', JSON.stringify(newSelected));
      localStorage.setItem('selectAllChecked', JSON.stringify(allProductsSelected));
  
      return newSelected;
    });
  };

  const handleSelectAllChange = () => {
    setSelectAllChecked((prevChecked) => {
      const newCheckedState = !prevChecked;
      if (newCheckedState) {
        setSelectedCartProducts(cartData.flatMap((cartItem) => cartItem.CartProducts.map((item) => item.id)));
      } else {
        setSelectedCartProducts([]);
      }
  
      // Save to localStorage after updating selectedCartProducts
      localStorage.setItem('selectedCartProducts', JSON.stringify(selectedCartProducts));
      localStorage.setItem('selectAllChecked', JSON.stringify(newCheckedState));
  
      return newCheckedState;
    });
  };

  const calculateTotalPriceAndQuantity = () => {
    let totalPrice = 0;
    let totalQuantity = 0;
  
    if (selectAllChecked) {
      cartData.forEach((cartItem) => {
        totalPrice += parseFloat(cartItem.totalPrice);
        totalQuantity += cartItem.totalQuantity;
      });
    } else {
      selectedCartProducts.forEach((productId) => {
        const cartItem = cartData.find((item) =>
          item.CartProducts && item.CartProducts.some((product) => product.id === productId)
        );
  
        if (cartItem && cartItem.CartProducts) {
          const selectedItem = cartItem.CartProducts.find((item) => item.id === productId);
          if (selectedItem) {
            totalPrice += parseFloat(selectedItem.price);
            totalQuantity += selectedItem.quantity; // Use the quantity of the selected item
          }
        }
      });
    }
  
    return { totalPrice, totalQuantity };
  };

  const { totalPrice, totalQuantity } = calculateTotalPriceAndQuantity()

  return (
    <Box padding={'24px'} display={{ base: 'none', xl: 'block' }}>
      <Text mb={'8px'} fontFamily={'heading'} fontWeight={'700'} fontSize={'22px'}>
        Shopping Cart
      </Text>
      {cartData.map((cartItem) => (
        <Box key={cartItem.id} display={'flex'} gap={'16px'} justifyContent={'center'}>
          <Box w={{ xl: '1100px', '2xl': '1420px' }}>
            <TableContainer>
              <Table variant="simple" bgColor={'white'}>
                <Thead border="100px">
                  <Tr borderBottomWidth={'16px'} borderBottomColor={'brand.grey100'}>
                    <Td w={'20px'} padding={'16px'} colSpan={2}>
                      <Box display={'flex'} alignItems={'center'} gap={'12px'}>
                        <Checkbox
                          colorScheme="red"
                          size="md"
                          onChange={handleSelectAllChange}
                          isChecked={selectAllChecked}
                        >
                          <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                            Select All
                          </Text>
                        </Checkbox>
                        <Box w={'1px'} h={'20px'} bgColor={'#000000'} />
                        <Box
                          cursor={'pointer'}
                          onClick={handleDeleteButtonClick}
                        >
                          <Text
                            color={'#CD0244'}
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'16px'}
                          >
                            Delete
                          </Text>
                        </Box>
                      </Box>
                    </Td>
                    <Td fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                      Size
                    </Td>
                    <Td fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                      Color
                    </Td>
                    <Td fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                      Quantity
                    </Td>
                    <Td fontFamily={'body'} fontWeight={'600'} fontSize={'16px'} color={'#838383'}>
                      Total Price
                    </Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartItem?.CartProducts?.map((item) => (
                    <Tr key={item.id}>
                      <Td padding={'16px'}>
                        <Checkbox
                          colorScheme="red"
                          size="md"
                          onChange={() => handleCheckboxChange(item.id)}
                          isChecked={selectedCartProducts.includes(item.id)}
                        />
                      </Td>
                      <Td>
                        <Box w={'300px'} display={'flex'} gap={'16px'}>
                          <Box minW={'64px'} h={'64px'} bgColor={'brand.grey100'} />
                          <Box
                            w={'220px'}
                            overflow={'hidden'}
                            display={'flex'}
                            flexDirection={'column'}
                            gap={'10px'}
                          >
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                              {item?.Stock?.Product?.name}
                            </Text>
                            <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                              {toRupiah(item?.Stock?.Product?.price, { floatingPoint: 0 })}
                            </Text>
                          </Box>
                        </Box>
                      </Td>
                      <Td>
                        <Box
                          w={'56px'}
                          h={'36px'}
                          border={'1px solid #D9D9D9'}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          borderRadius={'6px'}
                        >
                          <Text
                            fontFamily={'body'}
                            fontWeight={'600'}
                            fontSize={'16px'}
                            color={'#838383'}
                          >
                            L
                          </Text>
                        </Box>
                      </Td>
                      <Td>
                        <Box display={'flex'} alignItems={'center'} gap={'16px'}>
                          <Box w={'36px'} h={'36px'} bgColor={'#2F4E7A'} borderRadius={'6px'} />
                          <Box
                            w={'116px'}
                            h={'36px'}
                            border={'1px solid #D9D9D9'}
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            borderRadius={'6px'}
                          >
                            <Text
                              fontFamily={'body'}
                              fontWeight={'600'}
                              fontSize={'16px'}
                              color={'#838383'}
                            >
                              Dark Blue
                            </Text>
                          </Box>
                        </Box>
                      </Td>
                      <Td>
                        <Box
                          w={'130px'}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          gap={'8px'}
                          border={'1px solid #DEDCDC'}
                          borderRadius={'8px'}
                        >
                          <Button
                            variant="ghost"
                            // onClick={() => debouncedUpdateCart(item.id, Math.max(1, item.quantity - 1), onCartUpdated)}
                            onClick={() => handleButtonClick(item.id, -1)}
                            isDisabled={item.quantity === 1}
                          >
                            <Icon as={MinusIcon} color={'brand.lightred'} />
                          </Button>
                          <Text fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                            {productData[item.id]?.quantity || item?.quantity}
                          </Text>
                          <Button
                            variant="ghost"
                            // onClick={() => debouncedUpdateCart(item.id, Math.min(10, item.quantity + 1), onCartUpdated)}
                            onClick={() => handleButtonClick(item.id, 1)}
                            isDisabled={item.quantity === 10}
                          >
                            <Icon as={PlusIcon} color={'brand.lightred'} />
                          </Button>
                        </Box>
                      </Td>
                      <Td fontFamily={'body'} fontWeight={'600'} fontSize={'16px'}>
                        {toRupiah(item?.price, { floatingPoint: 0 })}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            w={{ xl: '334px', '2xl': '430px' }}
            h={'fit-content'}
            bgColor={'white'}
            display={'flex'}
            flexDirection={'column'}
            gap={'12px'}
            padding={'16px'}
          >
            <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
              Shopping Summary
            </Text>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'}>
                Total Price ({totalQuantity} Items)
              </Text>
              <Text fontFamily={'body'} fontWeight={'400'} fontSize={'16px'} color={'#838383'}>
                {toRupiah(totalPrice, { floatingPoint: 0 })}
              </Text>
            </Box>
            <Box w={'full'} h={'2px'} bgColor={'#F1F1F1'} />
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              mb={'16px'}
            >
              <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'}>
                Total Price
              </Text>
              <Text fontFamily={'body'} fontWeight={'700'} fontSize={'18px'} color={'#CD0244'}>
                {toRupiah(totalPrice, { floatingPoint: 0 })}
              </Text>
            </Box>
            <Button bgColor={'#CD0244'} color={'#ffffff'}>
              Process to Payment
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default LaptopCartTable
