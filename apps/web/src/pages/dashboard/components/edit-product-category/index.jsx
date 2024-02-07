import { Box, Button, Input, Text, VStack, useToast, HStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { API_ROUTE } from '../../../../services/route'
import { deleteProductCategory } from './services/deleteProductCategory'

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
  const editProductCategory = async (id, name) => {
    try {
      const res = await axios.patch(`${API_ROUTE}/product-category/${id}`, {
        name,
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
  // HANDLE EDIT

  // CREATE PRODUCT CATEGORY
  // NEW PARENT
  const [newChildren, setNewChildren] = useState(null)

  const createProductCategory = async (name, parentId) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/product-category`, {
        name,
        parentId,
      })
      toast({
        title: `${res?.data?.title}`,
        status: 'success',
      })
      return res
    } catch (err) {
      toast({
        title: `${err?.message}`,
        status: 'error',
      })
    }
  }

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
  data.forEach((item) => {
    initialValues[`name_${item.id}`] = item.name
    if (item.category) {
      const flattenData = [].concat(...item.category)
      flattenData.forEach((el) => {
        initialValues[`childName_${el.id}`] = el.name
      })
    }
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
  })

  return (
    <Box bgColor={'white'} p={'1em'} w={'100%'} h={'100%'}>
      <VStack align={'stretch'}>
        <Text fontWeight={'bold'}>Edit Product Category</Text>
        <Text fontWeight={'bold'}>{gender[0]?.name}</Text>
        <form>
          <VStack align={'stretch'} spacing={'2em'}>
            {productCategory?.map((item) => (
              <Box key={item.id} boxShadow={'md'} p={'.5em'} borderRadius={'.5em'}>
                <Text fontWeight={'bold'} mb={'.5em'}>
                  Group
                </Text>
                <Input
                  mb={'.3em'}
                  type="text"
                  id={`name_${item.id}`}
                  name={`name_${item.id}`}
                  onChange={formik.handleChange}
                  value={formik.values[`name_${item.id}`]}
                  borderColor={'transparent'}
                  focusBorderColor={'transparent'}
                  bgColor={'grey.50'}
                />
                <Text
                  w={'5em'}
                  fontSize={'.75em'}
                  fontWeight={'bold'}
                  color={'redPure.600'}
                  cursor={'pointer'}
                  onClick={() => {
                    editProductCategory(item.id, formik.values[`name_${item.id}`])
                  }}
                >
                  Save
                </Text>
                <Text
                  w={'5em'}
                  fontSize={'.75em'}
                  fontWeight={'bold'}
                  color={'redPure.600'}
                  cursor={'pointer'}
                  onClick={() => {
                    deleteProductCategory(item.id, null, null, toast)
                  }}
                >
                  Delete
                </Text>
                <Text fontWeight={'bold'} mb={'.5em'}>
                  Category
                </Text>
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
                        <Text
                          w={'5em'}
                          fontSize={'.75em'}
                          fontWeight={'bold'}
                          color={'redPure.600'}
                          cursor={'pointer'}
                          onClick={() => {
                            editProductCategory(child.id, formik.values[`childName_${child.id}`])
                          }}
                        >
                          Save
                        </Text>
                        <Text
                          w={'5em'}
                          fontSize={'.75em'}
                          fontWeight={'bold'}
                          color={'redPure.600'}
                          cursor={'pointer'}
                          onClick={() => {
                            deleteProductCategory(child.id, item.id, null, toast)
                          }}
                        >
                          Delete
                        </Text>
                      </div>
                    ))}
                </VStack>
                {editable[item?.id] && (
                  <Input
                    mt={'.5em'}
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
                    onChange={(e) => {
                      handleInput(item?.id, e.target.value)
                    }}
                  />
                )}
                <HStack my={'.5em'}>
                  <Button
                    _hover={{
                      bgColor: 'redPure.600',
                    }}
                    fontSize={'.8em'}
                    h={'2.5em'}
                    w={'5em'}
                    bgColor={'redPure.600'}
                    color={'white'}
                    onClick={() => handleEditClick(item.id)}
                  >
                    {editable[item?.id] ? 'Cancel' : 'Add'}
                  </Button>
                  {editable[item?.id] && (
                    <Button
                      _hover={{
                        bgColor: 'redPure.600',
                      }}
                      fontSize={'.8em'}
                      h={'2.5em'}
                      w={'5em'}
                      bgColor={'redPure.600'}
                      color={'white'}
                      onClick={async () => {
                        await createProductCategory(fixInput, item?.id)
                        setFixInput('')
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </HStack>
              </Box>
            ))}
          </VStack>
        </form>
        <Text fontWeight={'bold'} display={editable[gender[0]?.id] ? 'block' : 'none'}>
          New Group
        </Text>
        {editable[gender[0]?.id] && (
          <>
            <Input
              id={`${gender[0]?.id}`}
              placeholder={'Input new product group'}
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
            <Text fontWeight={'bold'}>New Category</Text>
            <Input
              id={`${gender[0]?.id}`}
              placeholder={'Input the categories of the group'}
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
              bgColor: 'redPure.600',
            }}
            fontSize={'.8em'}
            h={'2.5em'}
            w={editable[gender[0]?.id] ? '5em' : '10em'}
            bgColor={'redPure.600'}
            color={'white'}
            onClick={() => handleEditClick(gender[0]?.id)}
          >
            {editable[gender[0]?.id] ? 'Cancel' : 'Add New Group'}
          </Button>
          {editable[gender[0]?.id] && (
            <Button
              _hover={{
                bgColor: 'redPure.600',
              }}
              fontSize={'.8em'}
              h={'2.5em'}
              w={'5em'}
              bgColor={'redPure.600'}
              color={'white'}
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
