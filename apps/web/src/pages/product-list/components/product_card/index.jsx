import { Box, Button, Center, Flex, HStack, Icon, Image, Spacer, Text } from '@chakra-ui/react'
import { StarIcon, PlusIcon, HeartIcon } from '@heroicons/react/24/outline'
import toRupiah from '@develoka/angka-rupiah-js'
import { useNavigate } from 'react-router-dom'
export const ProductCard = (props) => {
  const navigate = useNavigate()
  return (
    <Box
      h={'23em'}
      borderRadius={'.5em'}
      overflow={'hidden'}
      cursor={'pointer'}
      onClick={() => navigate(`/product/${props?.id}/?col=0&sz=0`)}
    >
      <Flex flexDir={'column'} w={'100%'} h={'100%'}>
        <Box h={'50%'} w={'100%'} p={'0'} bgColor={'white'}>
          <Box h={'100%'} w={'100%'}>
            <Image
              w={'100%'}
              h={'100%'}
              src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${
                props?.picture[0]?.imageUrl
              }`}
              objectFit={'cover'}
              alt={'Photo Products'}
            />
          </Box>
        </Box>
        <Spacer />
        <Box h={'50%'} bgColor={'white'} p={'1em'}>
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
