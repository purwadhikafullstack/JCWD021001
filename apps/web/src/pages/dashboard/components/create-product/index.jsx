import React, { useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
import { Formik, Field, Form, useFormik } from 'formik'
import * as Yup from 'yup'
import { getGender } from '../../services/readGender'
import { getProductCategories } from '../../../product-list/services/readProductCategory'
import { createProduct } from '../../services/createProduct'

export const CreateProduct = () => {
  // TOAST
  const toast = useToast()
  // TOAST

  // EDITABLE
  const [editable, setEditable] = useState({})
  const handleEditClick = (id) => {
    setEditable((set) => ({
      [id]: !set[id],
      [!id]: set[!id],
    }))
  }
  // EDITABLE

  // VALIDATION SCHEMA
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number().required('Price is required'),
    productCategoryId: Yup.number().required('Category is required'),
    description: Yup.string().required('Description is required'),
  })
  // VALIDATION SCHEMA

  // CATEGORY VALUE TO BE SHOWED IN INPUT
  const [gender, setGender] = useState('Men')
  const [group, setGroup] = useState('')
  const [categoryValue, setCategoryValue] = useState('')
  // CATEGORY VALUE TO BE SHOWED IN INPUT

  // CATEGORIES
  const [productCategories, setProductCategories] = useState([])
  useEffect(() => {
    getProductCategories(setProductCategories, gender)
  }, [])

  // GENDER
  const [genders, setGenders] = useState([])
  useEffect(() => {
    getGender(setGenders)
  }, [])
  const renderedGenders = genders?.map((el, index) => {
    return (
      <Text
        cursor={'pointer'}
        key={index}
        itemID={el.id}
        onClick={() => {
          setGender(el?.name)
          setGroup('')
          setCategoryValue('')
        }}
      >
        {el?.name}
      </Text>
    )
  })
  // GENDER

  // GROUP
  const renderedGroup = productCategories.map((productGroup, index) => {
    return (
      <Text
        cursor={'pointer'}
        key={index}
        itemID={productGroup.id}
        onClick={() => {
          setGroup(productGroup?.name)
          setCategoryValue('')
          formik.setFieldValue('productCategoryId', '')
          handleEditClick(productGroup?.name)
        }}
      >
        {productGroup.name}
      </Text>
    )
  })
  // GROUP

  // CATEGORY
  const renderedCategory = productCategories.map((productGroup) => {
    return productGroup.category.map((productCategory, index) => {
      return (
        <>
          {editable[productGroup?.name] && (
            <Text
              cursor={'pointer'}
              key={index}
              itemID={productCategory.id}
              onClick={() => {
                setCategoryValue(productCategory.name)
                setGroup(productGroup?.name)
                formik.setFieldValue('productCategoryId', productCategory?.id)
              }}
            >
              {productCategory.name}
            </Text>
          )}
        </>
      )
    })
  })
  // CATEGORY
  // CATEGORIES

  // HANDLE SUBMIT
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await createProduct(
        values.name,
        Number(values.price),
        values.description,
        Number(values.productCategoryId),
      )
      toast({
        title: `${res?.data?.message}`,
        status: 'success',
        placement: 'bottom',
      })
      setSubmitting(false)
      setCategoryValue('')
      resetForm()
    } catch (err) {
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }
  // HANDLE SUBMIT

  // FORMIK INITIAL VALUES
  // FORMIK INITIAL VALUES

  const formik = useFormik({
    validateOnBlur: true,
    initialValues: {
      name: '',
      price: '',
      productCategoryId: '',
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  return (
    <Box p={'1em'} bgColor={'white'}>
      <Text fontWeight={'bold'} mb={'2em'}>
        Create Product
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <VStack direction="column" align="center">
          <FormControl isRequired>
            <FormLabel htmlFor="name" fontWeight={'bold'}>
              Product Name
            </FormLabel>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Type Product Name Here"
              borderColor={'transparent'}
              focusBorderColor={'transparent'}
              bgColor={'grey.50'}
            />
            {formik.errors.name && <Text color="red">{formik.errors.name}</Text>}
          </FormControl>

          <FormControl isRequired>
            <Text display={'none'}></Text>
            <FormLabel htmlFor="productCategoryId" fontWeight={'bold'}>
              Category
            </FormLabel>
            <Input
              name="productCategoryId"
              id="productCategoryId"
              fontWeight={'bold'}
              onChange={formik.handleChange}
              placeholder="Select Category"
              borderColor={'transparent'}
              focusBorderColor={'transparent'}
              bgColor={'grey.50'}
              value={`${gender}   |   ${group}   |   ${categoryValue}`}
              readOnly
            />
            {formik.errors.productCategoryId && (
              <Text color="red">{formik.errors.productCategoryId}</Text>
            )}
            <Grid
              mt={'1em'}
              templateColumns="repeat(3, 1fr)"
              w={'100%'}
              gap={'1em'}
              border={'2px solid #f2f2f2'}
              borderRadius={'.5em'}
              p={'1em'}
              fontWeight={'bold'}
            >
              <Box p={'.5em'}>
                <VStack align={'stretch'}>{renderedGenders}</VStack>
              </Box>
              <Box p={'.5em'} borderLeft={'2px solid lightgray'}>
                <VStack align={'stretch'}>{renderedGroup}</VStack>
              </Box>
              <Box p={'0 .5em'} borderLeft={'2px solid lightgray'}>
                <VStack align={'stretch'}>{renderedCategory}</VStack>
              </Box>
            </Grid>
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="description" fontWeight={'bold'}>
              Description
            </FormLabel>
            <Textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Input Description"
            />
            {formik.errors.description && <Text color="red">{formik.errors.description}</Text>}
          </FormControl>
          <FormControl isRequired>
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
                id={'price'}
                name={'price'}
                type={'number'}
                value={formik.values.price}
                onChange={formik.handleChange}
                placeholder="Input Price Here"
                borderColor={'grey.50'}
                _focus={{ borderColor: 'grey.50' }}
                focusBorderColor={'transparent'}
              />
            </InputGroup>
            {formik.errors.price && <Text color="red">{formik.errors.price}</Text>}
          </FormControl>
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
              isLoadButtoning={false}
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
      </form>
    </Box>
  )
}
