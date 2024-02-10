import { AspectRatio, Box, Button, Flex, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { Carousel } from '../carousel'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { createCart } from '../../../cart/services/createCart' // edit by andri
import { useToast } from '@chakra-ui/react' // edit by andri
import { ColourBox } from '../colour-box'
import { SizeBox } from '../size-box'

export const Body = (props) => {
  // Location
  const location = useLocation()
  const pathName = location.pathname

  // Query params
  const queryParams = new URLSearchParams(location.search)

  // Colour Id
  const colourValue = queryParams.get('col')

  // Size id
  const sizeValue = queryParams.get('sz')

  // Image carousel
  const images = [props?.product?.picture]

  // Define size
  const sizes = props?.product?.category?.parent?.size

  // Define colours
  const colours = props?.product?.colour

  // Displaying selected image
  const [selectedImage, setSelectedImage] = useState('')
  const handleSelectImage = (image) => {
    setSelectedImage(image)
  }

  // Get stock
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

  // Disable if stock doesnt exist
  const shouldDisable = !stock ? true : false

  // edit by andri
  const toast = useToast()
  const handleAddToCart = async () => {
    const newItem = {
      userId: 1,
      productId: props?.product?.id,
      colourId: colourValue,
      sizeId: sizeValue,
      price: props?.product?.price,
      quantity: 1,
    }

    const isProductInCart = cartData.some((cartItem) =>
      cartItem.CartProducts.some((product) => product.product.id === newItem.productId),
    )

    if (isProductInCart) {
      toast({
        title: 'Product Already in Cart',
        description: 'This product is already in your cart.',
        status: 'warning',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
      return; 
    }
    try {
      await createCart(newItem)
      toast({
        title: 'Cart Created',
        description: 'Your cart has been successfully created.',
        status: 'success',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      })

      await fetchCartCount()
    } catch (err) {
      toast({
        title: 'Error',
        description: err?.response?.data?.error || 'An error occurred.',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  //
  // Toggle Sidebar
  const [colourToggle, setColourToggle] = useState({})

  // Handle Toggle
  const changeColourToggle = (id) => {
    if (id !== colourValue) {
      setColourToggle((set) => ({
        [id]: !set[id],
        [!id]: set[id],
      }))
    }
  }
  // Toggle Sidebar
  const [sizeToggle, setSizeToggle] = useState({})

  // Handle Toggle
  const changeSizeToggle = (id) => {
    setSizeToggle((set) => ({
      [id]: !set[id],
      [!id]: set[id],
    }))
  }

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
                  {colours?.map((colour, index) => {
                    return (
                      <ColourBox
                        {...colour}
                        pathName={pathName}
                        key={index}
                        changeColourToggle={changeColourToggle}
                        colourToggle={colourToggle}
                        sizeValue={sizeValue}
                      />
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
                  {sizes?.map((size, index) => {
                    return (
                      <SizeBox
                        {...size}
                        index={index}
                        changeSizeToggle={changeSizeToggle}
                        pathName={pathName}
                        sizeToggle={sizeToggle}
                        colourValue={colourValue}
                      />
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
                  onClick={handleAddToCart} // edit by andri
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
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </VStack>
    </Box>
  )
}
