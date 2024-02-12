import { Box, Button, Input, Text, VStack, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { getProduct } from '../../../product-list/services/readProduct'
import { ProductList } from './component/product-list'
import { StockSelection } from './component/stock-selection'
import { createStockJournal } from './services/createStock'
import { useLocation } from 'react-router-dom'
import { checkStock } from './services/readStock'

export const CreateStock = (props) => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // QUERY PARAMS
  const warehouseValue = queryParams.get('wa')
  // TOAST
  const toast = useToast()

  // WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(props?.user?.warehouseId)

  const [colourId, setColourId] = useState(0)

  //   PRODUCT NAME FILTER
  const [productNameFilter, setProductNameFilter] = useState('')

  //   PRODUCTS
  const [products, setProducts] = useState([])

  //   PRODUCT SELECTED
  const [productSelected, setProductSelected] = useState({})

  // COLOUR
  const colours = productSelected?.colour
  useEffect(() => {
    setWarehouseId(props?.user?.warehouseId)
    getProduct(productNameFilter, '', '', '', setProducts, 'name', 'ASC', 1)
  }, [productNameFilter, setProductSelected])

  //   PRODUCT SIZES
  const [sizes, setSizes] = useState([])
  const [sizeId, setSizeId] = useState(0)
  useEffect(() => {
    if (productSelected) {
      setSizes(productSelected?.category?.parent?.size)
    }
  }, [productSelected?.name])

  // STOCK VALUE
  const [stockValue, setStockValue] = useState(0)

  //   PRODUCT ID WILL BE SENT
  const [productId, setProductId] = useState(0)
  const [productName, setProductName] = useState('')

  //   FORMIK
  const formik = useFormik({
    initialValues: {
      stock: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
      } catch (err) {
        throw err
      }
      resetForm({
        values: {
          stock: '',
        },
      })
    },
  })

  const handleCreateStockJournal = async (
    productId,
    warehouseId,
    sizeId,
    colourId,
    qty,
    isUpdate,
  ) => {
    try {
      const res = await createStockJournal(productId, warehouseId, sizeId, colourId, qty, isUpdate)
      toast({
        title: `${res?.data?.message}`,
        status: 'success',
        placement: 'bottom',
      })
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'An unexpected error occurred'
      toast({
        title: `${errorMessage}`,
        status: 'error',
      })
    }
  }

  return (
    <Box p={'1em'} h={'100%'} w={'100%'} bgColor={'white'}>
      <VStack align={'stretch'}>
        <Text>Create Stock</Text>
        <form onSubmit={formik.handleSubmit}>
          <VStack align={'stretch'}>
            <Input
              placeholder="Product Name"
              _placeholder={{ color: 'brand.grey350' }}
              bg={'brand.grey100'}
              variant={'filled'}
              mb={'24px'}
              value={productName}
              isReadOnly
            />
            <ProductList
              setProductId={setProductId}
              products={products}
              setProductName={setProductName}
              setProductNameFilter={setProductNameFilter}
              setProductSelected={setProductSelected}
            />
            <StockSelection
              sizes={sizes}
              colours={colours}
              setColourId={setColourId}
              setSizeId={setSizeId}
              stockValue={stockValue}
              setStockValue={setStockValue}
            />
            <Button
              alignSelf={'flex-end'}
              width={'168px'}
              padding={'12px 16px'}
              bgColor={'brand.lightred'}
              color={'white'}
              _hover={{ bg: '#f50f5a' }}
              _active={{ opacity: '70%' }}
              onClick={async () => {
                try {
                  const res = await checkStock(
                    productId,
                    warehouseValue ? warehouseValue : warehouseId,
                    sizeId,
                    colourId,
                  )
                  if (res?.data?.data) throw new Error('Stock is exist')
                  await handleCreateStockJournal(
                    productId,
                    warehouseValue ? warehouseValue : warehouseId,
                    sizeId,
                    colourId,
                    Number(stockValue),
                    false,
                  )
                  setProductId(0)
                  setWarehouseId(warehouseId)
                  setSizeId(0)
                  setColourId(0)
                  setStockValue(0)
                } catch (err) {
                  const errorMessage =
                    err.message && err.response && err.response.data && err.response.data.message
                      ? err.response.data.message
                      : 'An unexpected error occurred'
                  if (err.message === 'Stock is exist') {
                    toast({
                      title: 'Stock already exists',
                      status: 'error', // or 'info' depending on your design
                    })
                  }
                }
              }}
            >
              Create
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  )
}
