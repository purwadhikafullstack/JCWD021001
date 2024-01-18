import {
  Box,
  Text,
  Input,
  Flex,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  InputGroup,
  InputLeftElement,
  HStack,
  Grid,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../../product-details/services/readProductDetails'

export const EditProduct = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.string().required('Price is required'),
    productCategoryId: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
  })
  const initialValues = {
    name: '',
    price: 0,
    productCategoryId: 0,
    description: '',
  }
  const { epid } = useParams()
  const [product, setProduct] = useState(null)
  useEffect(() => {
    getProductDetails(epid, setProduct)
  }, [])
  console.log(product, 'product')
  console.log('EPID', epid)
  return (
    <Box>
      <Text>Edit Product</Text>
    </Box>
  )
}
