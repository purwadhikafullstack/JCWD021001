import { Box, Button, Input, Text, VStack } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { getProduct } from '../../../product-list/services/readProduct'
import { getColours } from './services/readColour'
import { ProductList } from './component/product-list'
import { StockSelection } from './component/stock-selection'

export const CreateStock = () => {
  // COLOUR
  const [colours, setColours] = useState([])
  const [colourId, setColourId] = useState(0)

  //   PRODUCT NAME FILTER
  const [productNameFilter, setProductNameFilter] = useState('')

  //   PRODUCTS
  const [products, setProducts] = useState([])

  //   PRODUCT SELECTED
  const [productSelected, setProductSelected] = useState({})

  useEffect(() => {
    getProduct(productNameFilter, '', '', '', setProducts, 'name', 'ASC', 1)
    if (products) {
      getColours().then((data) => setColours(data))
    }
  }, [productNameFilter, setProductSelected])

  //   PRODUCT SIZES
  const [sizes, setSizes] = useState([])
  const [sizeId, setSizeId] = useState(0)
  useEffect(() => {
    if (productSelected) {
      setSizes(productSelected?.category?.parent?.size)
    }
  }, [productSelected?.name])

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
            />
            <Button
              alignSelf={'flex-end'}
              type="submit"
              width={'168px'}
              padding={'12px 16px'}
              bgColor={'brand.lightred'}
              color={'white'}
              _hover={{ bg: '#f50f5a' }}
              _active={{ opacity: '70%' }}
            >
              Create
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  )
}
