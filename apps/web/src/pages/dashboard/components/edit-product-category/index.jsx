import { Box, Button, Input, Text, VStack, useToast, HStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { API_ROUTE } from '../../../../services/route'

export const EditProductCategory = () => {
  // USE PARAMS
  const { epid } = useParams()
  // USE PARAMS

  // TOAST
  const toast = useToast()
  // TOAST

  // GET GENDER DETAILS
  const [gender, setGender] = useState([])
  const getGender = async (name) => {
    try {
      const res = await axios.get(`${API_ROUTE}/product-category/gender?name=${name}`)
      setGender(res?.data?.data)
    } catch (err) {
      throw err
    }
  }

  // GET GENDER DETAILS

  // GET PRODUCT CATEGORY
  const [productCategory, setProductCategory] = useState([])
  const getProductCategory = async (setProductCategory, gender) => {
    try {
      const res = await axios.get(`${API_ROUTE}/product-category?gender=${gender}`)
      setProductCategory(res?.data?.data)
    } catch (err) {
      throw err
    }
  }

  // GET PRODUCT CATEGORY

  // HANDLE EDIT
  const editProductCategory = async (id) => {
    try {
      const res = await axios.patch(`${API_ROUTE}/product-category/${id}`)
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
  // HANDLE EDIT

  // CREATE PRODUCT CATEGORY
  // NEW PARENT
  const [newChildren, setNewChildren] = useState(null)
  // NEW PARENT
  const createProductCategory = async (name, parentId) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/product-category`, {
        name,
        parentId,
      })
      toast({
        title: `${res?.data?.title}`,
        status: 'success',
        placement: 'bottom',
      })
      return res
    } catch (err) {
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }
  // CREATE PRODUCT CATEGORY

  // INPUT VALUE
  const [input, setInput] = useState([{}])
  const [fixInput, setFixInput] = useState('')
  const onFocusInput = (id, text) => {
    const test = {
      id,
      text,
    }
    setInput([test, ...input])
  }
  const handleInput = async (id, text) => {
    setInput(
      input.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            text,
          }
        } else {
          return el
        }
      }),
    )
    setFixInput(text)
  }
  const findById = (id) => {
    const foundObject = input.find((item) => item.id === id)
    return foundObject ? foundObject.text : null
  }

  // INPUT VALUE

  useEffect(() => {
    getGender(epid)
    getProductCategory(setProductCategory, epid)
  }, [epid])

  const [editable, setEditable] = useState({})
  const handleEditClick = (id) => {
    setEditable((set) => ({
      ...set,
      [id]: !set[id],
    }))
  }

  const prodCatData = productCategory?.map((productGroup, index) => {
    return {
      name: productGroup?.name,
      id: productGroup?.id,
      category: [
        productGroup?.category?.map((productCategory, index) => {
          return {
            name: productCategory?.name,
            id: productCategory?.id,
          }
        }),
      ],
    }
  })

  const flattenData = [].concat(...prodCatData)

  const data = [...flattenData]

  const initialValues = {}

  // Set initial values for each item in the data array
  data.forEach((item) => {
    initialValues[`name_${item.id}`] = item.name

    if (item.category) {
      const flattenData = [].concat(...item.category)
      console.log('A', flattenData)

      flattenData.forEach((el) => {
        console.log('el', el)
        initialValues[`childName_${el.id}`] = el.name
      })
    }
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form values:', values)
    },
  })

  return (
    <Box bgColor={'white'} p={'1em'}>
      <VStack align={'stretch'}>
        <Text fontWeight={'bold'}>Edit Product Category</Text>
        <Text fontWeight={'bold'}>{gender[0]?.name}</Text>
        <form onSubmit={formik.handleSubmit}>
          <VStack align={'stretch'}>
            {productCategory?.map((item) => (
              <div key={item.id}>
                <Input
                  mb={'.5em'}
                  type="text"
                  id={`name_${item.id}`}
                  name={`name_${item.id}`}
                  onChange={formik.handleChange}
                  value={formik.values[`name_${item.id}`]}
                  borderColor={'transparent'}
                  borderBottom={'2px solid gray'}
                  focusBorderColor={'transparent'}
                  bgColor={'grey.50'}
                />
                <VStack align={'stretch'}>
                  {item.category &&
                    item.category.map((child) => (
                      <div key={child.id}>
                        <Input
                          type="text"
                          id={`childName_${child.id}`}
                          name={`childName_${child.id}`}
                          onChange={formik.handleChange}
                          value={formik.values[`childName_${child.id}`]}
                          borderColor={'transparent'}
                          focusBorderColor={'transparent'}
                          bgColor={'grey.50'}
                        />
                        {editable[child?.id] && (
                          <Input
                            id={`${item.id}`}
                            placeholder={'Input new product categories'}
                            borderColor={'transparent'}
                            focusBorderColor={'transparent'}
                            bgColor={'grey.50'}
                            value={findById(item?.id)}
                            onFocus={(e) => onFocusInput(item?.id, e.target.value)}
                            onBlur={() => {
                              setInput([{}])
                            }}
                            mt={'.5em'}
                            onChange={(e) => {
                              handleInput(item?.id, e.target.value)
                            }}
                          />
                        )}
                        <HStack>
                          <Button
                            mt={'.5em'}
                            _hover={{
                              bgColor: 'redPure.500',
                            }}
                            w={'5em'}
                            bgColor={'redPure.500'}
                            color={'white'}
                            isLoading={false}
                            onClick={() => handleEditClick(child.id)}
                          >
                            {editable[child?.id] ? 'Cancel' : 'Add'}
                          </Button>
                          {editable[child?.id] && (
                            <Button
                              mt={'.5em'}
                              _hover={{
                                bgColor: 'redPure.500',
                              }}
                              w={'5em'}
                              bgColor={'redPure.500'}
                              color={'white'}
                              isLoading={false}
                              onClick={async () => {
                                await createProductCategory(fixInput, item?.id)
                                setFixInput('')
                              }}
                            >
                              Submit
                            </Button>
                          )}
                        </HStack>
                      </div>
                    ))}
                </VStack>
              </div>
            ))}
            <button type="submit">Submit</button>
          </VStack>
        </form>
        <Text fontWeight={'bold'}>Parent</Text>
        {editable[gender[0]?.id] && (
          <>
            <Input
              id={`${gender[0]?.id}`}
              placeholder={'Input new product categories'}
              borderColor={'transparent'}
              focusBorderColor={'transparent'}
              bgColor={'grey.50'}
              value={findById(gender[0]?.id)}
              onFocus={(e) => onFocusInput(gender[0]?.id, e.target.value)}
              onBlur={() => {
                setInput([{}])
              }}
              onChange={(e) => {
                handleInput(gender[0]?.id, e.target.value)
              }}
            />
            <Text>Children</Text>
            <Input
              id={`${gender[0]?.id}`}
              placeholder={'Input new product categories'}
              borderColor={'transparent'}
              focusBorderColor={'transparent'}
              bgColor={'grey.50'}
              onChange={(e) => {
                setNewChildren(e.target.value)
              }}
            />
          </>
        )}
        <HStack>
          <Button
            _hover={{
              bgColor: 'redPure.500',
            }}
            w={'5em'}
            bgColor={'redPure.500'}
            color={'white'}
            isLoading={false}
            onClick={() => handleEditClick(gender[0]?.id)}
          >
            {editable[gender[0]?.id] ? 'Cancel' : 'Add'}
          </Button>
          {editable[gender[0]?.id] && (
            <Button
              _hover={{
                bgColor: 'redPure.500',
              }}
              w={'5em'}
              bgColor={'redPure.500'}
              color={'white'}
              isLoading={false}
              onClick={async (e) => {
                const res = await createProductCategory(fixInput, gender[0]?.id)
                createProductCategory(newChildren, res?.data?.data?.id)
                setFixInput('')
              }}
            >
              Submit
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  )
}
