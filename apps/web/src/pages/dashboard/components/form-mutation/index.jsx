import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
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

export const FormMutation = () => {
  // LOCATION
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // QUERY PARAMS
  const pageValue = queryParams.get('pa')

  // PATHNAME
  const pathName = location.pathname

  //   WAREHOUSE ID
  const [warehouseId, setWarehouseId] = useState(4)

  //   CONST RECIPIENT WAREHOUSE ID
  const [recipientWarehouseId, setRecipientWarehouseId] = useState(5)

  //   TOAST
  const toast = useToast()

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
    recipientWarehouseId: recipientWarehouseId,
    qty: 0,
    isAccepted: 0,
    stockId: 0,
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
    onSubmit: (values) => {
      console.log('form-mutation', values)
      handleCreateMutation(
        formData?.requesterWarehouseId,
        formData?.recipientWarehouseId,
        formData?.qty,
        formData?.isAccepted,
        formData?.stockId,
      )
    },
  })

  //   STOCKS
  const [stocks, setStocks] = useState([])

  useEffect(() => {
    getStock(recipientWarehouseId, pageValue).then((data) => setStocks(data))
  }, [pageValue])

  const renderedTableBody = stocks?.rows?.map((stock, index) => {
    return (
      <Tr key={index}>
        <Td>{stock?.product?.name}</Td>
        <Td>{stock?.size?.name}</Td>
        <Td>{stock?.colour?.name}</Td>
        <Td>{stock?.qty}</Td>
        <Td>
          <Button
            _hover={{
              bgColor: 'redPure.500',
            }}
            w={'5em'}
            bgColor={'redPure.500'}
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

  console.log('form-data', formData)

  return (
    <Box p={'1em'} bgColor={'white'} minH={'100vh'}>
      <Flex dir={'column'} justifyContent={'space-between'}>
        <VStack align={'stretch'} w={'100%'}>
          <Text>Form Mutation</Text>
          <form onSubmit={formik.handleSubmit}>
            <VStack align={'stretch'}>
              <FormControl isRequired>
                <FormLabel htmlFor={'recipientWarehouseAddress'}>Warehouse Destination</FormLabel>
                <Select
                  placeholder={'Select warehouse'}
                  id={'recipientWarehouseAddress'}
                  name={'recipientWarehouseAddress'}
                  type={'text'}
                  value={formik.values.recipientWarehouseAddress}
                  onChange={formik.handleChange}
                >
                  <option value={'jambi'}>Jambi</option>
                </Select>
                {formik.errors.recipientWarehouseAddress && (
                  <Text color="red">{formik.errors.recipientWarehouseAddress}</Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor={'productName'}>Product Name</FormLabel>
                <Input
                  placeholder={'Select product'}
                  id={'productName'}
                  name={'productName'}
                  type={'text'}
                  value={formik.values.productName}
                  onChange={formik.handleChange}
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
                    <Thead bg={'redPure.500'} position={'relative'}>
                      <Tr>
                        <Th color={'#FEFEFE'}>Products</Th>
                        <Th color={'#FEFEFE'}>Size</Th>
                        <Th color={'#FEFEFE'}>Color</Th>
                        <Th color={'#FEFEFE'} w={'10em'}>
                          Stock
                        </Th>
                        <Th color={'#FEFEFE'} w={'10em'}>
                          Action
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody position={'relative'} color={'#6D6D6D'} fontWeight={'500'}>
                      {renderedTableBody}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
              <FormControl isRequired>
                <FormLabel htmlFor={'qty'}>Quantity</FormLabel>
                <Input
                  placeholder={'Input quantity'}
                  id={'qty'}
                  name={'qty'}
                  type={'number'}
                  value={formik.values.qty}
                  onChange={(e) => {
                    formik.setFieldValue('qty', e.target.value)
                    setFormData((formData) => ({
                      ...formData,
                      qty: e.target.value,
                    }))
                  }}
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
