import React, { useEffect, useState } from 'react'
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
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { getGender } from '../../services/readGender'
import { getProductCategory } from '../../../product-list/services/readProductCategory'
import { createProduct } from '../../services/createProduct'

export const CreateProduct = () => {
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
  const handleSubmit = async (values, { setSubmitting }, actions) => {
    createProduct(values.name, Number(values.price), values.description, Number(prodCatId))
    setSubmitting(false)
    actions.resetForm()
  }
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
  const [productCategories, setProductCategories] = useState([])
  useEffect(() => {
    getProductCategory(setProductCategories)
  }, [])
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
  const [categoryId, setCategoryId] = useState(0)
  const [categoryValue, setCategoryValue] = useState('')
  const [prodCatId, setProdCatId] = useState(0)

  const renderedCategory = finalArray.map((el, index) => {
    return el.category.map((elPT, index) => {
      return (
        <Text
          key={index}
          itemID={elPT.id}
          onClick={() => {
            setCategoryId(elPT.id)
            setCategoryValue(elPT.name)
            setProdCatId(elPT.id)
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
  return (
    <Box p={'1em'} bgColor={'white'}>
      <Text fontWeight={'bold'} mb={'2em'}>
        Create Product
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <VStack direction="column" align="center">
            {/* Input 1 */}
            <Field name="name">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name} mb={3}>
                  <FormLabel htmlFor="name" fontWeight={'bold'}>
                    Product Name
                  </FormLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="Type Product Name Here"
                    borderColor={'transparent'}
                    focusBorderColor={'transparent'}
                    bgColor={'grey.50'}
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {/* Input 3 */}
            <Field name="productCategoryId">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.productCategoryId && form.touched.productCategoryId}
                  mb={3}
                >
                  <FormLabel htmlFor="productCategoryId" fontWeight={'bold'}>
                    Category
                  </FormLabel>
                  <Input
                    {...field}
                    id="productCategoryId"
                    placeholder="Select Category"
                    borderColor={'transparent'}
                    focusBorderColor={'transparent'}
                    bgColor={'grey.50'}
                    value={categoryValue}
                  />
                  <FormErrorMessage>{form.errors.productCategoryId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Grid
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
            <Field name="description">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.description && form.touched.description} mb={3}>
                  <FormLabel htmlFor="description" fontWeight={'bold'}>
                    Description
                  </FormLabel>
                  <Textarea {...field} id="description" placeholder="Input Description" />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            {/* Input 2 */}
            <Field name="price">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.price && form.touched.price} mb={3}>
                  <FormLabel htmlFor="price" fontWeight={'bold'}>
                    Price
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="grey.500"
                      fontSize="1em"
                      children="Rp"
                      bgColor={'grey.50'}
                      borderRadius={'.5em 0 0 .5em'}
                    />
                    <Input
                      ml={'1em'}
                      {...field}
                      id="price"
                      placeholder="Input Price Here"
                      borderColor={'grey.50'}
                      focusBorderColor={'transparent'}
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <HStack alignSelf={'flex-end'}>
              <Button
                type="reset"
                _hover={{
                  bgColor: 'transparent',
                }}
                w={'5em'}
                border={'1px solid #e3024b'}
                bgColor={'transparent'}
                color={'redPure.500'}
                isLoading={false}
              >
                Reset
              </Button>
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
