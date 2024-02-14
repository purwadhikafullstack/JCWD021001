import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { updateCart } from '../../../pages/cart/services/updateCart'
import { deleteCart } from '../../../pages/cart/services/deleteCart'
import _debounce from 'lodash/debounce'
import { useNavigate } from 'react-router-dom'
import { useCart } from './cartContext'
import { API_ROUTE } from '../../../services/route'
import toast from 'react-hot-toast'

const useCartState = (cartData, onCartUpdated) => {
  const [selectedCartProducts, setSelectedCartProducts] = useState([])
  const [selectAllChecked, setSelectAllChecked] = useState(false)
  const [productData, setProductData] = useState(() => {
    const storedProductData = localStorage.getItem('productData')
    return storedProductData ? JSON.parse(storedProductData) : {}
  })
  const [dataLoaded, setDataLoaded] = useState(false)
  const { fetchCartCount } = useCart()
  const navigate = useNavigate()

  // Function to fetch stock data for a product
  const getStock = async (productId, sizeId, colourId) => {
    try {
      const res = await axios.get(
        `${API_ROUTE}/stock/stock/qty?productId=${productId}&sizeId=${sizeId}&colourId=${colourId}`,
      )
      return res?.data?.data || 0 // Return stock quantity or 0 if not available
    } catch (err) {
      console.error('Error fetching stock:', err)
      return 0 // Return 0 in case of error
    }
  }

  // Function to fetch stock data for all products in the cart
  const fetchStockData = async (cartData) => {
    const newData = {}
    for (const cartItem of cartData) {
      for (const item of cartItem.CartProducts) {
        const stock = await getStock(item.productId, item.sizeId, item.colourId)
        newData[item.id] = stock
      }
    }
    return newData
  }

  // State to store stock data
  const [stockData, setStockData] = useState({})

  // Fetch stock data when cart data changes
  useEffect(() => {
    const fetchAndUpdateStockData = async () => {
      const newData = await fetchStockData(cartData)
      setStockData(newData)
    }
    fetchAndUpdateStockData()
  }, [cartData])

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
  }, [dataLoaded, cartData])

  const handleDeleteButtonClick = async () => {
    try {
      // Check if there are selected products to delete
      if (selectedCartProducts.length > 0) {
        // Perform deletion of selected products
        const res = await deleteCart(selectedCartProducts, onCartUpdated)

        // Remove deleted products from selectedCartProducts state
        setSelectedCartProducts([])

        // Update the local storage
        localStorage.removeItem('selectedCartProducts')
        localStorage.removeItem('selectAllChecked')
        localStorage.removeItem('productData')
        toast.success(res)
        setTimeout(() => {
          fetchCartCount()
        }, 3000)
      }
    } catch (err) {
      toast.error(err)
    }
  }

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
      const newCheckedState = !prevChecked
      const newSelectedProducts = newCheckedState
        ? cartData.flatMap((cartItem) => cartItem.CartProducts.map((item) => item.id))
        : []

      setSelectedCartProducts(newSelectedProducts)

      // Save to localStorage after updating selectedCartProducts
      localStorage.setItem('selectedCartProducts', JSON.stringify(newSelectedProducts))
      localStorage.setItem('selectAllChecked', JSON.stringify(newCheckedState))

      return newCheckedState
    })
  }

  const calculateTotalPriceAndQuantity = () => {
    let totalPrice = 0
    let totalQuantity = 0

    selectedCartProducts.forEach((productId) => {
      const cartItem = cartData.find(
        (item) =>
          item.CartProducts && item.CartProducts.some((product) => product.id === productId),
      )

      if (cartItem && cartItem.CartProducts) {
        const selectedItem = cartItem.CartProducts.find((item) => item.id === productId)
        if (selectedItem) {
          totalPrice += parseFloat(selectedItem.price)
          totalQuantity += selectedItem.quantity // Use the quantity of the selected item
        }
      }
    })

    return { totalPrice, totalQuantity }
  }

  // Mengatur hasVisitedCart ke true ketika pengguna mengunjungi rute /cart
  const handleVisitCart = () => {
    localStorage.setItem('hasVisitedCart', 'true')
    // Lakukan navigasi ke rute /cart jika diperlukan
  }

  const disableCheckout = () => {
    for (const cartItem of cartData) {
      for (const item of cartItem.CartProducts) {
        if (item?.quantity && productData[item.id]?.quantity > stockData[item.id]) {
          return true // Disable checkout if any product exceeds stock
        }
      }
    }
    return false // Enable checkout if no product exceeds stock
  }

  const handleCheckout = async () => {
    // Check if checkout should be disabled
    if (disableCheckout()) {
      // Display toast message indicating why checkout is disabled
      toast.error('One or more products exceed stock quantity')
      return // Exit early if checkout should be disabled
    }

    const { totalPrice, totalQuantity } = calculateTotalPriceAndQuantity()
    try {
      // Check if selectedCartProducts is not empty
      if (selectedCartProducts.length === 0) {
        toast.error('Select products to checkout') // Menampilkan pesan toast jika selectedCartProducts kosong
        return // Menghentikan proses checkout jika selectedCartProducts kosong
      }
      // Extract stock data from selected products
      const stockData = selectedCartProducts.map((productId) => {
        const cartItem = cartData.find((item) =>
          item.CartProducts.some((product) => product.id === productId),
        )
        const selectedProduct = cartItem?.CartProducts.find((item) => item.id === productId)

        return {
          productId: selectedProduct?.productId,
        }
      })

      handleVisitCart()
      navigate('/cart/order', { state: { stockData, totalPrice, totalQuantity } })
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

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
    stockData,
  }
}

export default useCartState
