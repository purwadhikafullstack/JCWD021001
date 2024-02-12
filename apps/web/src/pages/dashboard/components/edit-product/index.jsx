import { Box, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../../product-details/services/readProductDetails'
import { getProductCategories } from '../../../product-list/services/readProductCategory'
import { getGender } from '../../services/readGender'
import * as Yup from 'yup'
import { EditInput } from './component/input'
import { updateProduct } from '../../services/updateProduct'

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

  // EDITABLE
  const [editable, setEditable] = useState(false)
  const handleEditClick = () => {
    setEditable(!editable)
  }

  // EDITABLE
  const [editableCategory, setEditableCategory] = useState({})
  const handleEditClickCategory = (id) => {
    setEditableCategory((set) => ({
      [!id]: set[!id],
      [id]: !set[id],
    }))
  }

  // Category value to shown in input
  const [gender, setGender] = useState('')
  const [group, setGroup] = useState('')
  const [categoryValue, setCategoryValue] = useState('')

  // Set categories
  const [productCategories, setProductCategories] = useState([])
  useEffect(() => {
    getProductCategories(setProductCategories, gender)
  }, [gender])

  // Render Gender
  const [genders, setGenders] = useState([])
  useEffect(() => {
    getGender(setGenders)
  }, [])

  // HANDLE SUBMIT
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await updateProduct(
      values.name,
      Number(values.price),
      values.description,
      Number(values.productCategoryId),
      product?.id,
      toast,
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

  return (
    <Box p={'1em'} bgColor={'white'}>
      <Text fontWeight={'bold'} mb={'2em'}>
        <Text as={'span'}>{props?.isSuperAdmin ? 'Edit' : 'View'}</Text> Product
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <EditInput
          formik={formik}
          editable={editable}
          group={group}
          gender={gender}
          genders={genders}
          categoryValue={categoryValue}
          setGender={setGender}
          setGroup={setGroup}
          setCategoryValue={setCategoryValue}
          productCategories={productCategories}
          handleEditClickCategory={handleEditClickCategory}
          product={product}
          isSuperAdmin={props?.isSuperAdmin}
          productId={product?.id}
          handleEditClick={handleEditClick}
          editableCategory={editableCategory}
        />
      </form>
    </Box>
  )
}
