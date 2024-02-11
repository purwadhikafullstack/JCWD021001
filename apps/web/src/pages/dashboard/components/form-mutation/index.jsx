import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { getStock } from '../stock-management/services/readStock'
import { useLocation } from 'react-router-dom'
import { createMutation } from '../stock-mutation/services/createMutation'
import { getWarehouses } from './services/readWarehouse'
import { SearchInput } from '../create-stock/component/search-input'

export const FormMutation = (props) => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')

  // PATHNAME
  const pathName = location.pathname

  //   WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(props?.user?.warehouseId)

  //   CONST RECIPIENT WAREHOUSE ID
  const [recipientWarehouseId, setRecipientWarehouseId] = useState(null)

  //   TOAST
  const toast = useToast()

  // Warehouse lists
  const [warehouses, setWarehouses] = useState([])

  useEffect(() => {
    setWarehouseId(props?.user?.warehouseId)
    getWarehouses(warehouseId).then((data) => {
      setWarehouses(data)
    })
  }, [])

  //   HANDLE CREATE MUTATION
  const handleCreateMutation = async (
    requesterWarehouseId,
    recipientWarehouseId,
    qty,
    isAccepted,
    stockId,
  ) => {
    try {
      const res = await createMutation(
        requesterWarehouseId,
        recipientWarehouseId,
        qty,
        isAccepted,
        stockId,
      )
      toast({
        title: `${res?.message}`,
        status: 'success',
        placement: 'bottom',
      })
    } catch (err) {
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }

  //   FORM DATA
  const [formData, setFormData] = useState({
    requesterWarehouseId: warehouseId,
    recipientWarehouseId: 0,
    qty: 0,
    isAccepted: null,
    stockId: 0,
  })

  // Warehouse options
  const warehouseOptions = warehouses?.map((warehouse, index) => {
    return (
      <option key={index} id={warehouse?.id} value={warehouse?.id}>
        {warehouse?.WarehouseAddress?.location}
      </option>
    )
  })

  // FORMIK
  const formik = useFormik({
    initialValues: {
      recipientWarehouseAddress: '',
      productName: '',
      qty: '',
    },
    validateOnBlur: true,
    validationSchema: yup.object({
      recipientWarehouseAddress: yup.string().required('Please select the warehouse'),
      productName: yup.string().required('Please select the product'),
      qty: yup.number().required('Input quantity'),
    }),
    onSubmit: async (values) => {
      handleCreateMutation(
        formData?.requesterWarehouseId,
        formData?.recipientWarehouseId,
        formData?.qty,
        formData?.isAccepted,
        formData?.stockId,
      )
    },
  })
  // Search Input
  const [productNameFilter, setProductNameFilter] = useState('')
  //   STOCKS
  const [stocks, setStocks] = useState([])

  const handleKeyDown = (event) => {
    // Prevent form submission on Enter key press
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }
  useEffect(() => {
    getStock(recipientWarehouseId, productNameFilter, pageValue, 10).then((data) => setStocks(data))
  }, [pageValue, productNameFilter, recipientWarehouseId, setRecipientWarehouseId])

  const renderedTableBody = stocks?.rows?.map((stock, index) => {
    return (
      <Tr key={index} cursor={'pointer'} p={'.875em'} bgColor={'#FAFAFA'}>
        <Td>{stock?.product?.name}</Td>
        <Td>{stock?.size?.name}</Td>
        <Td>{stock?.colour?.name}</Td>
        <Td>{stock?.qty}</Td>
        <Td>
          <Button
            _hover={{
              bgColor: 'redPure.600',
            }}
            fontSize={'.8em'}
            h={'2.5em'}
            w={'5em'}
            bgColor={'redPure.600'}
            color={'white'}
            onClick={() => {
              formik.setFieldValue('productName', stock?.product?.name)
              setFormData((formData) => ({
                ...formData,
                stockId: stock?.id,
              }))
            }}
          >
            Choose
          </Button>
        </Td>
      </Tr>
    )
  })

  return (
    <Box p={'1em'} bgColor={'white'} minH={'100vh'}>
      <Flex dir={'column'} justifyContent={'space-between'}>
        <VStack align={'stretch'} w={'100%'}>
          <Heading as={'h1'} fontSize={'1.5em'}>
            Form Mutation
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <VStack align={'stretch'}>
              <FormControl isRequired>
                <FormLabel fontWeight={'bold'} htmlFor={'recipientWarehouseAddress'}>
                  Warehouse Destination
                </FormLabel>
                <Select
                  placeholder={'Select warehouse'}
                  id={'recipientWarehouseAddress'}
                  name={'recipientWarehouseAddress'}
                  type={'text'}
                  value={formik.values.recipientWarehouseAddress}
                  onChange={(e) => {
                    setRecipientWarehouseId(e?.target?.value)
                    setFormData((formData) => ({
                      ...formData,
                      recipientWarehouseId: +e.target.value,
                    }))
                    formik.setFieldValue('recipientWarehouseAddress', e.target.value)
                  }}
                  borderColor={'transparent'}
                  focusBorderColor={'transparent'}
                  bgColor={'grey.50'}
                >
                  {warehouseOptions}
                </Select>
                {formik.errors.recipientWarehouseAddress && (
                  <Text color="red">{formik.errors.recipientWarehouseAddress}</Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel fontWeight={'bold'} htmlFor={'productName'}>
                  Product Name
                </FormLabel>
                <Flex justifyContent={'space-between'} alignItems={'center'}>
                  <Box>
                    <FormControl>
                      <SearchInput setProductNameFilter={setProductNameFilter} />
                    </FormControl>
                  </Box>
                </Flex>
                <Input
                  mt={'1em'}
                  placeholder={'Select product'}
                  id={'productName'}
                  name={'productName'}
                  type={'text'}
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  borderColor={'transparent'}
                  focusBorderColor={'transparent'}
                  bgColor={'grey.50'}
                  onKeyDown={handleKeyDown}
                  isReadOnly
                />
                {formik.errors.productName && <Text color="red">{formik.errors.productName}</Text>}
              </FormControl>
              <Box
                h={'50vh'}
                overflowX={'scroll'}
                overflowY={'scroll'}
                sx={{
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <TableContainer w={'100%'}>
                  <Table
                    variant={'striped'}
                    colorScheme={'customTableColor'}
                    style={{
                      padding: '0',
                      borderRadius: '.5em',
                      overflow: 'hidden',
                    }}
                  >
                    <Thead bg={'redPure.600'} position={'relative'}>
                      <Tr>
                        <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                          Products
                        </Th>
                        <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                          Size
                        </Th>
                        <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'}>
                          Color
                        </Th>
                        <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'} w={'10em'}>
                          Stock
                        </Th>
                        <Th color={'#FEFEFE'} textTransform={'none'} fontSize={'1em'} w={'10em'}>
                          Action
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody fontWeight={'bold'} position={'relative'}>
                      {renderedTableBody}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              <FormControl isRequired>
                <FormLabel fontWeight={'bold'} htmlFor={'qty'}>
                  Quantity
                </FormLabel>
                <Input
                  placeholder={'Input quantity'}
                  w={'10em'}
                  id={'qty'}
                  name={'qty'}
                  type={'number'}
                  value={formik.values.qty}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    formik.setFieldValue('qty', e.target.value)
                    setFormData((formData) => ({
                      ...formData,
                      qty: e.target.value,
                    }))
                  }}
                  borderColor={'transparent'}
                  focusBorderColor={'transparent'}
                  bgColor={'grey.50'}
                />
                {formik.errors.qty && <Text color="red">{formik.errors.qty}</Text>}
              </FormControl>
              <Button
                alignSelf={'flex-end'}
                type="submit"
                _hover={{
                  bgColor: 'redPure.500',
                }}
                w={'5em'}
                bgColor={'redPure.500'}
                color={'white'}
                isLoading={false}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </VStack>
      </Flex>
    </Box>
  )
}
