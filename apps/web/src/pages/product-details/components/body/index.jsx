import { AspectRatio, Box, Button, Flex, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export const Body = (props) => {
  return (
    <Box p={'1em'} bgColor={'grey.50'} minH={'100vh'}>
      <VStack align={'sretch'}>
        <Box>
          <Text fontWeight={'bold'}>{props?.product[0]?.category?.parent?.parent?.name}</Text>
        </Box>
        <Flex
          flexDir={{ base: 'column', sm: 'row' }}
          justifyContent={{ md: 'space-between' }}
          gap={'1em'}
        >
          <VStack align={'stretch'} w={{ sm: '40%' }}>
            <Box bgColor={'white'} overflow={'hidden'} borderRadius={'1em'}>
              <AspectRatio ratio={1}>
                <Image src="https://bit.ly/naruto-sage" alt="naruto" objectFit="cover" />
              </AspectRatio>
            </Box>
          </VStack>

          <Box bgColor={'white'} p={'1em'} borderRadius={'1em'} w={{ sm: '60%' }}>
            <Flex flexDir={'column'} gap={'.5em'} justifyContent={'space-between'} h={'100%'}>
              <Text fontWeight={'bold'} mb={'1em'}>
                {props?.product[0]?.name}
              </Text>
              <Text fontWeight={'bold'} fontSize={{ base: '.75em', md: '1em' }}>
                Description
              </Text>
              <Text fontSize={{ base: '.75em', md: '1em' }}>{props?.product[0]?.description}</Text>
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
              <VStack align={'stretch'}>
                <Flex justifyContent={'space-between'} alignItems={'center'} fontSize={'.9em'}>
                  <Text fontWeight={'bold'}>Size</Text>
                  <Text color={'redPure.500'}>View Size Chart</Text>
                </Flex>
                <HStack>
                  <Box
                    borderRadius={'.5em'}
                    p={'.5em 1em'}
                    fontSize={'.75em'}
                    border={'2px solid #f2f2f2'}
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
                <Button w={'50%'} bgColor={'redPure.500'} color={'white'}>
                  Add to cart
                </Button>
                <Button
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
