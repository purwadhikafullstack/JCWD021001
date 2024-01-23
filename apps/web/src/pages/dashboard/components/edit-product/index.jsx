import {
  Box,
  Text,
  Input,
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
  useToast,
  Image,
  Icon,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../../product-details/services/readProductDetails'
import { getProductCategory } from '../../../product-list/services/readProductCategory'
import { getGender } from '../../services/readGender'
import axios from 'axios'
import { ImageUpload } from '../image-upload'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const EditProduct = () => {
  // SET TOAST
  const toast = useToast()
  // SET TOAST

  // UPDATE PRODUCT
  const updateProduct = async (name, price, description, productCategoryId, id) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/product/${id}`, {
        name,
        price,
        description,
        productCategoryId,
        id,
      })
      toast({
        title: `${res?.data?.message}`,
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
  // UPDATE PRODUCT

  // DELETE PRODUCT IMAGES
  const deleteProductImage = async (id, productId) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/product-image`, {
        data: { id, productId },
      })
      toast({
        title: `${res?.data?.title}`,
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
  // DELETE PRODUCT IMAGES

  // Start validation schema
  const validationSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // price: Yup.string().required('Price is required'),
    // productCategoryId: Yup.string().required('Category is required'),
    // description: Yup.string().required('Description is required'),
  })
  // End validation schema

  // GET GENDER
  const [gender, setGender] = useState([])
  useEffect(() => {
    getGender(setGender)
  }, [])
  const renderedGender = gender?.map((el, index) => {
    return (
      <Text key={index} itemID={el.id}>
        {el.name}
      </Text>
    )
  })
  // GET GENDER

  // GET PRODUCT CATEGORIES
  const [productCategories, setProductCategories] = useState([])

  const groupedArray = productCategories.reduce((result, item) => {
    const parentName = item.parent.name
    const parentId = item.parent.id
    if (!result[parentName]) {
      result[parentName] = { name: parentName, id: parentId, category: [] }
    }
    result[parentName].category.push({ id: item.id, name: item.name })
    return result
  }, {})
  const finalArray = Object.values(groupedArray)
  const renderedCategory = finalArray.map((el, index) => {
    return el.category.map((elPT, index) => {
      return (
        <Text
          key={index}
          itemID={elPT.id}
          onClick={() => {
            setCategoryId(elPT.id)
            setCategoryValue(elPT.name)
          }}
        >
          {elPT.name}
        </Text>
      )
    })
  })
  const renderedGroup = finalArray.map((el, index) => {
    return (
      <Text key={index} itemID={el.id}>
        {el.name}
      </Text>
    )
  })
  // GET PRODUCT CATEGORIES

  // CATEGORY ID WANT TO SEND
  const [categoryId, setCategoryId] = useState(0)
  // CATEGORY ID WANT TO SEND

  // HANDLE SUBMIT
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await updateProduct(
      values.name,
      Number(values.price),
      values.description,
      Number(categoryId),
      product?.id,
    )
    resetForm()
    setSubmitting(false)
  }
  // HANDLE SUBMIT

  // CATEGORY VALUE TO BE SHOWED IN INPUT
  const [categoryValue, setCategoryValue] = useState('')
  // CATEGORY VALUE TO BE SHOWED IN INPUT
  // FORMIK INITIAL VALUES

  useEffect(() => {
    getProductCategory(setProductCategories)
  }, [])

  // FORMIK INITIAL VALUES
  const [editable, setEditable] = useState({})
  const handleEditClick = (id) => {
    setEditable((set) => ({
      ...set,
      [id]: !set[id],
    }))
  }
  // Start set product
  const { epid } = useParams()
  const [product, setProduct] = useState(null)
  useEffect(() => {
    getProductDetails(epid, setProduct)
  }, [editable])
  // End set product

  const initialValues = {
    name: product?.name || '',
    price: product?.price || '',
    productCategoryId: product?.productCategoryId || '',
    description: product?.description || '',
  }
  return (
    <Box p={'1em'} bgColor={'white'}>
      <Text fontWeight={'bold'} mb={'2em'}>
        Edit Product
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <VStack direction="column" align="flex-start">
            <Field name="name">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name} mb={3}>
                  <FormLabel htmlFor="name" fontWeight={'bold'}>
                    Product Name
                  </FormLabel>
                  <Text fontWeight={'bold'} mb={'1em'}>
                    {product?.name}
                  </Text>
                  {editable[field.name] && (
                    <Input
                      {...field}
                      id="name"
                      placeholder={'Input youre new product name'}
                      borderColor={'transparent'}
                      focusBorderColor={'transparent'}
                      bgColor={'grey.50'}
                      mb={'1em'}
                    />
                  )}
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  <Button
                    _hover={{
                      bgColor: 'redPure.500',
                    }}
                    w={'5em'}
                    bgColor={'redPure.500'}
                    color={'white'}
                    isLoading={false}
                    onClick={() => handleEditClick(field.name)}
                    type={'reset'}
                  >
                    {editable[field.name] ? 'Cancel' : 'Edit'}
                  </Button>
                </FormControl>
              )}
            </Field>
            <Field name="productCategoryId">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.productCategoryId && form.touched.productCategoryId}
                  mb={3}
                >
                  <FormLabel htmlFor="productCategoryId" fontWeight={'bold'}>
                    Category
                  </FormLabel>
                  <HStack mb={'1em'}>
                    <Text>{product?.category?.parent?.parent?.name}</Text>
                    <Icon as={ChevronRightIcon} />
                    <Text>{product?.category?.parent?.name}</Text>
                    <Icon as={ChevronRightIcon} />
                    <Text>{product?.category?.name}</Text>
                  </HStack>
                  {editable[field.name] && (
                    <Input
                      {...field}
                      mb={'1em'}
                      id="productCategoryId"
                      placeholder={'Select your product category'}
                      borderColor={'transparent'}
                      focusBorderColor={'transparent'}
                      bgColor={'grey.50'}
                      color={'black'}
                      value={categoryValue}
                      isReadOnly
                    />
                  )}
                  {editable['productCategoryId'] && (
                    <Grid
                      mb={'1em'}
                      templateColumns="repeat(3, 1fr)"
                      w={'100%'}
                      gap={'1em'}
                      border={'2px solid #f2f2f2'}
                      borderRadius={'.5em'}
                      p={'1em'}
                      fontWeight={'bold'}
                    >
                      <Box p={'.5em'}>
                        <VStack align={'stretch'}>{renderedGender}</VStack>
                      </Box>
                      <Box p={'.5em'} borderLeft={'2px solid lightgray'}>
                        <VStack align={'stretch'}>{renderedGroup}</VStack>
                      </Box>
                      <Box p={'0 .5em'} borderLeft={'2px solid lightgray'}>
                        <VStack align={'stretch'}>{renderedCategory}</VStack>
                      </Box>
                    </Grid>
                  )}
                  <Button
                    _hover={{
                      bgColor: 'redPure.500',
                    }}
                    w={'5em'}
                    bgColor={'redPure.500'}
                    color={'white'}
                    isLoading={false}
                    onClick={() => {
                      handleEditClick(field.name)
                      setCategoryValue('')
                    }}
                  >
                    {editable[field.name] ? 'Cancel' : 'Edit'}
                  </Button>
                  <FormErrorMessage>{form.errors.productCategoryId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Text fontWeight={'bold'}>Photo Product</Text>
            <Grid w={'100%'} templateColumns={'repeat(3, 1fr)'} gap={'.5em'}>
              {product?.picture?.map((el, index) => {
                return (
                  <Box key={index} w={'5em'} h={'5em'} border={'1px solid lightgray'}>
                    <VStack align={'stretch'}>
                      <Image
                        src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${
                          el?.imageUrl
                        }`}
                      />
                      <Button
                        _hover={{
                          bgColor: 'transparent',
                        }}
                        fontSize={'.75em'}
                        alignSelf={'flex-start'}
                        w={'3em'}
                        h={'2em'}
                        border={'1px solid #e3024b'}
                        bgColor={'transparent'}
                        color={'redPure.500'}
                        onClick={() => {
                          deleteProductImage(el?.id, '')
                        }}
                      >
                        Delete
                      </Button>
                    </VStack>
                  </Box>
                )
              })}
            </Grid>
            <ImageUpload productId={product?.id} />
            <Field name="description">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.description && form.touched.description} mb={3}>
                  <FormLabel htmlFor="description" fontWeight={'bold'}>
                    Description
                  </FormLabel>
                  <Text mb={'1em'}>{product?.description}</Text>
                  {editable[field.name] && (
                    <Textarea
                      {...field}
                      id="description"
                      placeholder={'Input your product description'}
                      mb={'1em'}
                    />
                  )}
                  <Button
                    _hover={{
                      bgColor: 'redPure.500',
                    }}
                    w={'5em'}
                    bgColor={'redPure.500'}
                    color={'white'}
                    isLoading={false}
                    onClick={() => handleEditClick(field.name)}
                    type={'reset'}
                  >
                    {editable[field.name] ? 'Cancel' : 'Edit'}
                  </Button>
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="price">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.price && form.touched.price} mb={3}>
                  <FormLabel htmlFor="price" fontWeight={'bold'}>
                    Price
                  </FormLabel>
                  <Text mb={'1em'}>{product?.price}</Text>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="grey.500"
                      fontSize="1em"
                      children="Rp"
                      bgColor={'grey.50'}
                      borderRadius={'.5em 0 0 .5em'}
                    />
                    {editable[field.name] && (
                      <Input
                        mb={'1em'}
                        ml={'1em'}
                        {...field}
                        id="price"
                        placeholder={'Input youre new price'}
                        borderColor={'grey.50'}
                        focusBorderColor={'transparent'}
                      />
                    )}
                  </InputGroup>
                  <Button
                    _hover={{
                      bgColor: 'redPure.500',
                    }}
                    w={'5em'}
                    bgColor={'redPure.500'}
                    color={'white'}
                    isLoading={false}
                    onClick={() => handleEditClick(field.name)}
                  >
                    {editable[field.name] ? 'Cancel' : 'Edit'}
                  </Button>
                  <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <HStack alignSelf={'flex-end'}>
              <Button
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
            </HStack>
          </VStack>
        </Form>
      </Formik>
    </Box>
  )
}
