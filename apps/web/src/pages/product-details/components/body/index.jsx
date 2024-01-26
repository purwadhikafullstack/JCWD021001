import { AspectRatio, Box, Button, Flex, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Carousel } from '../carousel'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

export const Body = (props) => {
  const images = [props?.product?.picture]
  const sizes = props?.product?.category?.parent?.size
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const navigate = useNavigate()
  const colourValue = queryParams.get('col')
  const sizeValue = queryParams.get('sz')
  const pathName = location.pathname
  // FILTER STOCK
  const uniqueColorIds = new Set()
  const filteredStocks = props?.product?.stocks?.filter((stock) => {
    if (!uniqueColorIds.has(stock.colourId)) {
      uniqueColorIds.add(stock.colourId)
      return true
    }
    return false
  })
  // FILTER STOCK

  const [selectedImage, setSelectedImage] = useState('')
  const handleSelectImage = (image) => {
    setSelectedImage(image)
  }

  const [stock, setStock] = useState(null)

  const getStock = async (productId, sizeId, colourId, setStock) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/stock/stock/qty?productId=${productId}&sizeId=${sizeId}&colourId=${colourId}`,
      )
      setStock(res?.data?.data)
    } catch (err) {
      throw err
    }
  }
  useEffect(() => {
    getStock(props?.product?.id, sizeValue, colourValue, setStock)
  }, [colourValue, sizeValue])

  console.log('PRO', props?.product)

  const shouldDisable = !stock ? true : false
  return (
    <Box p={'1em'} bgColor={'grey.50'} minH={'100vh'}>
      <VStack align={'sretch'}>
        <Box>
          <Text fontWeight={'bold'} fontSize={{ md: '1.5em' }}>
            {props?.product?.category?.parent?.parent?.name}
          </Text>
        </Box>
        <Flex
          flexDir={{ base: 'column', sm: 'row' }}
          justifyContent={{ md: 'space-between' }}
          gap={'1em'}
        >
          <Box w={{ sm: '30%' }} overflow={'hidden'}>
            <AspectRatio ratio={1} overflow={'hidden'}>
              <Image
                src={
                  selectedImage
                    ? `${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${selectedImage}`
                    : `${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${
                        props?.product?.picture[0]?.imageUrl
                      }`
                }
                alt="naruto"
                objectFit="cover"
              />
            </AspectRatio>
            <Carousel images={images} handleSelectImage={handleSelectImage} />
          </Box>
          <Box bgColor={'white'} p={'1em'} borderRadius={'1em'} w={{ sm: '70%' }} h={'83vh'}>
            <Flex flexDir={'column'} gap={'.5em'} justifyContent={'space-between'} h={'100%'}>
              <Text fontWeight={'bold'} fontSize={{ md: '1.5em' }}>
                {props?.product?.name}
              </Text>
              <Box>
                <Text fontWeight={'bold'} fontSize={{ base: '.75em', md: '1.5em' }}>
                  Description
                </Text>
                <Text fontSize={{ base: '.75em', md: '1em' }}>{props?.product?.description}</Text>
              </Box>
              <Box>
                <Text fontWeight={'bold'} fontSize={'.9em'}>
                  Color
                </Text>
                <HStack>
                  {filteredStocks?.map((el, index) => {
                    return (
                      <Box p={'.5em'} border={'2px solid #f2f2f2'} borderRadius={'.5em'}>
                        <VStack spacing={'1em'}>
                          <Box
                            bgColor={el?.colour?.name}
                            w={'2.5em'}
                            h={'2.5em'}
                            borderRadius={'.5em'}
                            onClick={() => navigate(`${pathName}?col=${el?.id}&sz=0`)}
                          ></Box>
                          <Text fontWeight={'bold'} fontSize={'.75em'}>
                            {el?.colour?.name}
                          </Text>
                        </VStack>
                      </Box>
                    )
                  })}
                </HStack>
              </Box>
              <VStack align={'stretch'}>
                <Flex justifyContent={'space-between'} alignItems={'center'} fontSize={'.9em'}>
                  <Text fontWeight={'bold'}>Size</Text>
                  <Text color={'redPure.500'}>View Size Chart</Text>
                </Flex>
                <HStack>
                  {sizes?.map((el, index) => {
                    return (
                      <Box
                        key={index}
                        borderRadius={'.5em'}
                        p={'.5em 1em'}
                        fontSize={{ base: '.75em', md: '1em' }}
                        border={'2px solid #f2f2f2'}
                        fontWeight={'bold'}
                        onClick={() => navigate(`${pathName}?col=${colourValue}&sz=${el?.id}`)}
                      >
                        <Text>{el?.name}</Text>
                      </Box>
                    )
                  })}
                </HStack>
              </VStack>
              <VStack align={'stretch'}>
                <Text fontWeight={'bold'} fontSize={'.9em'}>
                  Quantity
                </Text>
                <HStack>
                  <Flex
                    w={'40%'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    p={'.5em'}
                    border={'2px solid #f2f2f2'}
                    borderRadius={'.5em'}
                  >
                    <Icon as={MinusIcon} color={'redPure.500'} />
                    <Text>1</Text>
                    <Icon as={PlusIcon} color={'redPure.500'} />
                  </Flex>
                  <HStack alignSelf={'flex-end'} fontSize={'.75em'} fontWeight={'bold'}>
                    <Text color={'redPure.500'}>{stock}</Text>
                    <Text>{stock ? 'Stock' : 'Sorry, out of stock'}</Text>
                  </HStack>
                </HStack>
              </VStack>
              <HStack>
                <Button
                  _hover={{
                    bgColor: stock ? 'redPure.500' : 'grey.50',
                  }}
                  w={'50%'}
                  bgColor={stock ? 'redPure.500' : 'grey.50'}
                  color={stock ? 'white' : 'grey'}
                  isDisabled={shouldDisable}
                >
                  Add to cart
                </Button>
                <Button
                  _hover={{
                    bgColor: stock ? 'transparent' : 'grey.50',
                  }}
                  w={'50%'}
                  border={stock ? '1px solid #e3024b' : '1px solid #f2f2f2'}
                  bgColor={stock ? 'transparent' : 'grey.50'}
                  color={stock ? 'white' : 'grey'}
                  isDisabled={shouldDisable}
                >
                  Buy Now
                </Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </VStack>
    </Box>
  )
}
