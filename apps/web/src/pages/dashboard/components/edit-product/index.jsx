import {
  Box,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  InputGroup,
  InputLeftElement,
  HStack,
  Grid,
  VStack,
  useToast,
  Image,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../../product-details/services/readProductDetails'
import { getProductCategories } from '../../../product-list/services/readProductCategory'
import { getGender } from '../../services/readGender'
import axios from 'axios'
import { ImageUpload } from '../image-upload'
import * as Yup from 'yup'
import { CreateColour } from './component/create-colour'
import { API_ROUTE } from '../../../../services/route'

export const EditProduct = (props) => {
  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    price: Yup.number().notOneOf([0], 'Price cannot be 0').required('Price is required'),
    productCategoryId: Yup.number().required('Category is required'),
    description: Yup.string().required('Description is required'),
  })

  // SET TOAST
  const toast = useToast()
  // SET TOAST

  // EDITABLE
  const [editable, setEditable] = useState({})
  const handleEditClick = (id) => {
    setEditable((set) => ({
      ...set,
      [id]: !set[id],
    }))
  }
  // EDITABLE

  // UPDATE PRODUCT
  const updateProduct = async (name, price, description, productCategoryId, id) => {
    try {
      const res = await axios.patch(`${API_ROUTE}/api/product/${id}`, {
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

  // Create product colour

  // Category value to shown in input
  const [gender, setGender] = useState('')
  const [group, setGroup] = useState('')
  const [categoryValue, setCategoryValue] = useState('')

  // Set categories
  const [productCategories, setProductCategories] = useState([])
  useEffect(() => {
    getProductCategories(setProductCategories, gender)
  }, [gender])

  // Set gender
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

  // Render Group
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

  // Render Category
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

  // SET PRODUCT
  const { epid } = useParams()
  const [product, setProduct] = useState({})
  useEffect(() => {
    getProductDetails(epid)
      .then((data) => {
        setProduct(data)
      })
      .then(() => setGender(product?.category?.parent?.parent?.name || 'Men'))
      .then(() => setGroup(product?.category?.parent?.name || ''))
      .then(() => setCategoryValue(product?.category?.name || ''))
  }, [product?.name])

  const formik = useFormik({
    validateOnBlur: true,
    enableReinitialize: true,
    initialValues: {
      name: product?.name || '',
      price: product?.price || '',
      productCategoryId: product?.category?.id || '',
      description: product?.description || '',
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })

  const colours = product?.colour?.map((colour, index) => {
    return (
      <Box
        cursor={'pointer'}
        bgColor={'white'}
        p={'.5em'}
        border={'2px solid #f2f2f2'}
        borderRadius={'.5em'}
        key={index}
      >
        <VStack spacing={'1em'}>
          <Box
            p={'.5em'}
            bgColor={colour?.name}
            w={'2.5em'}
            h={'2.5em'}
            borderRadius={'.5em'}
          ></Box>
          <Text fontWeight={'bold'} fontSize={'.75em'}>
            {colour?.name}
          </Text>
        </VStack>
      </Box>
    )
  })
  return (
    <Box p={'1em'} bgColor={'white'}>
      <Text fontWeight={'bold'} mb={'2em'}>
        Edit Product
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <VStack direction="column" align="flex-start">
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
              <Box p={'0 .5em'}>
                <VStack align={'stretch'}>{renderedGenders}</VStack>
              </Box>
              <Box p={'0 .5em'} borderLeft={'2px solid lightgray'}>
                <VStack align={'stretch'}>{renderedGroup}</VStack>
              </Box>
              <Box p={'0 .5em'} borderLeft={'2px solid lightgray'}>
                <VStack align={'stretch'}>{renderedCategory}</VStack>
              </Box>
            </Grid>
          </FormControl>

          <VStack align={'stretch'}>
            <Text fontWeight={'bold'}>Photo Product</Text>
            <Grid w={'100%'} templateColumns={'repeat(3, 1fr)'} gap={'.5em'}>
              {product?.picture?.map((el, index) => {
                return (
                  <Box key={index} w={'5em'} h={'5em'} border={'1px solid lightgray'} mb={'2em'}>
                    <VStack align={'stretch'}>
                      <Image
                        src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${
                          el?.imageUrl
                        }`}
                      />
                      {props?.isSuperAdmin && (
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
                      )}
                    </VStack>
                  </Box>
                )
              })}
            </Grid>
          </VStack>
          <ImageUpload productId={product?.id} />
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
          <Text fontWeight={'bold'}>Product Colours</Text>
          <HStack>{colours}</HStack>
          <CreateColour productId={product?.id} />
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
