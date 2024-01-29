import { Box, Button, Input, Text, VStack, useToast, HStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'

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
      const res = await axios.get(`http://localhost:8000/api/product-category/gender?name=${name}`)
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
      const res = await axios.get(`http://localhost:8000/api/product-category?gender=${gender}`)
      setProductCategory(res?.data?.data)
    } catch (err) {
      throw err
    }
  }

  const groupedArray = productCategory.reduce((result, item) => {
    const parentName = item.parent.name
    const parentId = item.parent.id
    if (!result[parentName]) {
      result[parentName] = { name: parentName, id: parentId, category: [] }
    }
    result[parentName].category.push({ id: item.id, name: item.name })
    return result
  }, {})
  const finalArray = Object.values(groupedArray)

  // GET PRODUCT CATEGORY

  // HANDLE EDIT
  const editProductCategory = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:8000/api/product-category/${id}`)
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
  return (
    <Box bgColor={'white'} p={'1em'}>
      <VStack align={'stretch'}>
        <Text fontWeight={'bold'}>Edit Product Category</Text>
        <Text fontWeight={'bold'}>{gender[0]?.name}</Text>
        <VStack align={'stretch'}>
          {finalArray.map((el, index) => {
            return (
              <VStack key={index} align={'stretch'} p={'.5em'}>
                <Box borderBottom={'2px solid gray'}>
                  <VStack align={'stretch'} pb={'.5em'}>
                    <Text fontWeight={'bold'}>{el?.name}</Text>
                    {editable[el?.name] && (
                      <Input
                        id="name"
                        placeholder={el?.name}
                        borderColor={'transparent'}
                        focusBorderColor={'transparent'}
                        bgColor={'grey.50'}
                      />
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
                        onClick={() => handleEditClick(el?.name)}
                      >
                        {editable[el?.name] ? 'Cancel' : 'Edit'}
                      </Button>
                      {editable[el?.name] && (
                        <Button
                          _hover={{
                            bgColor: 'redPure.500',
                          }}
                          w={'5em'}
                          bgColor={'redPure.500'}
                          color={'white'}
                          isLoading={false}
                          onClick={() => {
                            editProductCategory(el?.id)
                          }}
                        >
                          Submit
                        </Button>
                      )}
                    </HStack>
                  </VStack>
                </Box>
                {el?.category?.map((elPC, index) => {
                  return (
                    <Box>
                      <VStack align={'stretch'}>
                        <Text fontWeight={'bold'}>{elPC?.name}</Text>
                        {editable[elPC?.name] && (
                          <Input
                            id="name"
                            placeholder={elPC?.name}
                            borderColor={'transparent'}
                            focusBorderColor={'transparent'}
                            bgColor={'grey.50'}
                          />
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
                            onClick={() => handleEditClick(elPC?.name)}
                          >
                            {editable[elPC?.name] ? 'Cancel' : 'Edit'}
                          </Button>
                          {editable[elPC?.name] && (
                            <Button
                              _hover={{
                                bgColor: 'redPure.500',
                              }}
                              w={'5em'}
                              bgColor={'redPure.500'}
                              color={'white'}
                              isLoading={false}
                              onClick={() => {
                                editProductCategory(elPC?.id)
                              }}
                            >
                              Submit
                            </Button>
                          )}
                        </HStack>
                      </VStack>
                    </Box>
                  )
                })}
                {editable[el?.id] && (
                  <Input
                    id={`${el.id}`}
                    placeholder={'Input new product categories'}
                    borderColor={'transparent'}
                    focusBorderColor={'transparent'}
                    bgColor={'grey.50'}
                    value={findById(el?.id)}
                    onFocus={(e) => onFocusInput(el?.id, e.target.value)}
                    onBlur={() => {
                      setInput([{}])
                    }}
                    onChange={(e) => {
                      handleInput(el?.id, e.target.value)
                    }}
                  />
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
                    onClick={() => handleEditClick(el.id)}
                  >
                    {editable[el?.id] ? 'Cancel' : 'Add'}
                  </Button>
                  {editable[el?.id] && (
                    <Button
                      _hover={{
                        bgColor: 'redPure.500',
                      }}
                      w={'5em'}
                      bgColor={'redPure.500'}
                      color={'white'}
                      isLoading={false}
                      onClick={async () => {
                        await createProductCategory(fixInput, el?.id)
                        setFixInput('')
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </HStack>
              </VStack>
            )
          })}
        </VStack>
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
