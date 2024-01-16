import { Box, Button, Center, Flex, HStack, Icon, Spacer, Text } from '@chakra-ui/react'
import { StarIcon, PlusIcon, HeartIcon } from '@heroicons/react/24/outline'
import toRupiah from '@develoka/angka-rupiah-js'
import { useNavigate } from 'react-router-dom'
export const ProductCard = (props) => {
  const navigate = useNavigate()
  return (
    <Box
      bgColor={'grey.200'}
      h={'23em'}
      borderRadius={'.5em'}
      overflow={'hidden'}
      cursor={'pointer'}
      onClick={() => navigate('/products')}
    >
      <Flex flexDir={'column'} w={'100%'} h={'100%'}>
        <Box h={'55%'} p={'1em'}>
          <Flex flexDir={'row-reverse'}>
            <Flex
              justifyContent={'center'}
              alignItems={'center'}
              a
              bgColor={'white'}
              w={'1.5em'}
              h={'1.5em'}
              borderRadius={'50%'}
            >
              <Icon as={HeartIcon} />
            </Flex>
          </Flex>
        </Box>
        <Spacer />
        <Box h={'45%'} bgColor={'white'} p={'1em'}>
          <Flex
            flexDir={'column'}
            w={'100%'}
            h={'100%'}
            justifyContent={'space-between'}
            fontSize={'.85em'}
            fontWeight={'bold'}
          >
            <Text>{props?.name}</Text>
            <Text>{toRupiah(props?.price)}</Text>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Icon as={StarIcon} />
              <Icon as={StarIcon} />
              <Icon as={StarIcon} />
              <Icon as={StarIcon} />
              <Icon as={StarIcon} />
              <Text fontWeight={'normal'}>(200)</Text>
            </Flex>
            <Button
              border={'1px solid #e3024b'}
              color={'redPure.500'}
              variant={'outline'}
              fontSize={'.85em'}
              fontWeight={'bold'}
              h={'2.5em'}
              _focus={{ bgColor: 'white' }}
            >
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Icon as={PlusIcon} fontSize={'1.3em'} />
                <Text>Add to cart</Text>
              </HStack>
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
