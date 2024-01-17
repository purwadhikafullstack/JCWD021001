import { useState, useEffect, useCallback } from 'react';
import { updateCart } from '../../../pages/cart/services/updateCart';
import { deleteCart } from '../../../pages/cart/services/deleteCart';
import _debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom'
import { CreateOrder } from '../../../pages/order/services/CreateOrder';


const useCartState = (cartData, onCartUpdated) => {
  console.log('asdfasd', cartData);
  const [selectedCartProducts, setSelectedCartProducts] = useState([])
  // console.log('dsfd', selectedCartProducts);
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [productData, setProductData] = useState(() => {
    const storedProductData = localStorage.getItem('productData')
    return storedProductData ? JSON.parse(storedProductData) : {}
  })
  const [dataLoaded, setDataLoaded] = useState(false)
  const navigate = useNavigate(); 

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
      setDataLoaded(true)
    }
  }, [cartData, dataLoaded])

  useEffect(() => {
    // Load checkbox states from localStorage once data is loaded
    if (dataLoaded) {
      const storedSelectAllChecked = localStorage.getItem('selectAllChecked')
      const storedSelectedCartProducts = localStorage.getItem('selectedCartProducts')

      if (storedSelectAllChecked) {
        setSelectAllChecked(JSON.parse(storedSelectAllChecked))
      }

      if (storedSelectedCartProducts) {
        setSelectedCartProducts((prevSelected) => {
          // Set to all product IDs only if selectAllChecked is true
          return JSON.parse(storedSelectAllChecked)
            ? cartData.flatMap((cartItem) => cartItem.CartProducts.map((item) => item.id))
            : JSON.parse(storedSelectedCartProducts)
        })
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
        : [...prevSelected, productId]

      // Check if all products are selected
      const allProductsSelected = cartData.every((cartItem) =>
        cartItem.CartProducts.every((product) => newSelected.includes(product.id)),
      )

      setSelectAllChecked(allProductsSelected)

      // Save to localStorage
      localStorage.setItem('selectedCartProducts', JSON.stringify(newSelected))
      localStorage.setItem('selectAllChecked', JSON.stringify(allProductsSelected))

      return newSelected
    })
  }

  const handleSelectAllChange = () => {
    setSelectAllChecked((prevChecked) => {
      const newCheckedState = !prevChecked;
      const newSelectedProducts = newCheckedState
        ? cartData.flatMap((cartItem) => cartItem.CartProducts.map((item) => item.id))
        : [];

      setSelectedCartProducts(newSelectedProducts);

      // Save to localStorage after updating selectedCartProducts
      localStorage.setItem('selectedCartProducts', JSON.stringify(newSelectedProducts));
      localStorage.setItem('selectAllChecked', JSON.stringify(newCheckedState));

      return newCheckedState;
    });
  }

  const calculateTotalPriceAndQuantity = () => {
    let totalPrice = 0
    let totalQuantity = 0

    selectedCartProducts.forEach((productId) => {
      const cartItem = cartData.find(
        (item) =>
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

    return { totalPrice, totalQuantity }
  }

  const handleCheckout = async () => {
    try {
      const { totalPrice, totalQuantity } = calculateTotalPriceAndQuantity();

      // Extract stock data from selected products
      const stockData = selectedCartProducts.map((productId) => {
        const cartItem = cartData.find((item) =>
          item.CartProducts.some((product) => product.id === productId)
        );
        const selectedProduct = cartItem?.CartProducts.find((item) => item.id === productId);

        return {
          stockId: selectedProduct?.stockId,
          price: selectedProduct?.price,
          quantity: selectedProduct?.quantity,
        };
      });
      console.log("data", [totalPrice, totalQuantity, stockData]);

      // Call the CreateOrder function to send the request
      await CreateOrder({
        userId: 1, // Update with the actual user ID
        userAddressId: 1, // Update with the actual address ID
        warehouseId: 1, // Update with the actual warehouse ID
        totalPrice,
        totalQuantity,
        shippingCost: 20000, // Update with the actual shipping cost
        orderStatusId: 1, // Update with the actual order status ID
        products: stockData,
      });

      // Navigate to the '/order' page or any other page you want to redirect to after checkout
      // navigate('/order');
    } catch (error) {
      // Handle errors if needed
      console.error('Error during checkout:', error);
    }
  };

  const { totalPrice, totalQuantity } = calculateTotalPriceAndQuantity()
  return {
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
  }
}

export default useCartState
