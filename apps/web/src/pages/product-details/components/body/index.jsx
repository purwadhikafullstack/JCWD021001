import { AspectRatio, Box, Button, Flex, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Carousel } from '../carousel'

export const Body = (props) => {
  const images = [
    'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462028/sub/goods_462028_sub13.jpg?width=750',
    'https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462028/item/idgoods_66_462028.jpg?width=750',
    'https://image.uniqlo.com/UQ/ST3/id/imagesgoods/462028/sub/idgoods_462028_sub9.jpg?width=750',
  ]
  const [selectedImage, setSelectedImage] = useState('')
  const handleSelectImage = (image) => {
    setSelectedImage(image)
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
          minH={'80vh'}
        >
          <Box w={{ sm: '40%' }} overflow={'hidden'} borderRadius={'1em'} h={'100%'}>
            <AspectRatio ratio={1} overflow={'hidden'} borderRadius={'1em'}>
              <Image
                src={selectedImage ? selectedImage : images[0]}
                alt="naruto"
                objectFit="cover"
              />
            </AspectRatio>
            <Carousel images={images} handleSelectImage={handleSelectImage} />
          </Box>
          <Box bgColor={'white'} p={'1em'} borderRadius={'1em'} w={{ sm: '60%' }}>
            <Flex flexDir={'column'} gap={'.5em'} justifyContent={'space-between'} h={'100%'}>
              <Text fontWeight={'bold'} fontSize={{ md: '1.5em' }}>
                {props?.product?.name}
              </Text>
              <Box>
                <Text fontWeight={'bold'} fontSize={{ base: '.75em', md: '1.5em' }}>
                  Description
                </Text>
                <Text fontSize={{ base: '.75em', md: '1em' }}>{props?.product?.description}</Text>
                <Text fontSize={{ base: '.75em', md: '1em' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget est efficitur,
                  luctus tellus vel, condimentum augue. Vestibulum tincidunt lacus sit amet massa
                  cursus pharetra. Suspendisse bibendum facilisis sagittis. Duis lobortis
                  ullamcorper est, ac lobortis nibh feugiat vitae. Quisque convallis sem id semper
                  condimentum. Donec sit amet consequat erat. Quisque vel varius elit. Vestibulum
                  euismod nisl sit amet laoreet malesuada. Mauris felis ante, auctor eget sem eget,
                  volutpat tristique orci. Sed neque sapien, ullamcorper non neque vitae, porttitor
                  tempus turpis. In auctor in dui quis iaculis. Cras at orci efficitur, consequat mi
                  maximus, dignissim ante. Mauris pretium mi turpis, a.
                </Text>
              </Box>
              <Box>
                <Text fontWeight={'bold'} fontSize={'.9em'}>
                  Color
                </Text>
                <HStack>
                  <Box p={'.5em'} border={'2px solid #f2f2f2'} borderRadius={'.5em'}>
                    <VStack spacing={'1em'}>
                      <Box bgColor={'blue'} w={'2.5em'} h={'2.5em'} borderRadius={'.5em'}></Box>
                      <Text fontWeight={'bold'} fontSize={'.75em'}>
                        Blue
                      </Text>
                    </VStack>
                  </Box>
                </HStack>
              </Box>
              <VStack align={'stretch'}>
                <Flex justifyContent={'space-between'} alignItems={'center'} fontSize={'.9em'}>
                  <Text fontWeight={'bold'}>Size</Text>
                  <Text color={'redPure.500'}>View Size Chart</Text>
                </Flex>
                <HStack>
                  <Box
                    borderRadius={'.5em'}
                    p={'.5em 1em'}
                    fontSize={{ base: '.75em', md: '1em' }}
                    border={'2px solid #f2f2f2'}
                    fontWeight={'bold'}
                  >
                    <Text>XS</Text>
                  </Box>
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
                  <HStack alignSelf={'flex-end'} fontSize={'.75em'}>
                    <Text color={'redPure.500'}>10</Text>
                    <Text>Stock</Text>
                  </HStack>
                </HStack>
              </VStack>
              <HStack>
                <Button
                  _hover={{
                    bgColor: 'redPure.500',
                  }}
                  w={'50%'}
                  bgColor={'redPure.500'}
                  color={'white'}
                >
                  Add to cart
                </Button>
                <Button
                  _hover={{
                    bgColor: 'transparent',
                  }}
                  w={'50%'}
                  border={'1px solid #e3024b'}
                  bgColor={'transparent'}
                  color={'redPure.500'}
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
