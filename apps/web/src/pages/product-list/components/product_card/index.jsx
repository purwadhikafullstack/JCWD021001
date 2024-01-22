import { AspectRatio, Box, Button, Flex, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import toRupiah from '@develoka/angka-rupiah-js'
import { useNavigate } from 'react-router-dom'
export const ProductCard = (props) => {
  const navigate = useNavigate()

  // TRUNCATE STRING
  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str
    }
    return str.slice(0, maxLength) + '...'
  }
  // TRUNCATE STRING
  return (
    <Box
      w={'100%'}
      h={{ base: '20em', sm: '20em', md: '19em', lg: '20em', xl: '22em' }}
      borderRadius={'.5em'}
      overflow={'hidden'}
      cursor={'pointer'}
      onClick={() => navigate(`/product/${props?.id}/?col=0&sz=0`)}
    >
      <VStack flexDir={'column'} align={'stretch'} h={'100%'} spacing={'0'}>
        <AspectRatio ratio={1}>
          <Image
            src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${
              props?.picture[0]?.imageUrl
            }`}
            objectFit={'cover'}
            alt={'Photo Products'}
          />
        </AspectRatio>
        <Box bgColor={'white'} p={'.5em 1em'} h={'100%'}>
          <Flex
            flexDir={'column'}
            w={'100%'}
            h={'100%'}
            justifyContent={'space-between'}
            fontSize={'.85em'}
            fontWeight={'bold'}
          >
            <Flex direction={'column'} h={'60%'} justifyContent={'space-between'}>
              <Text alignItems={'justify'}>{truncateString(props?.name, 20)}</Text>
              <Text>{toRupiah(props?.price)}</Text>
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
      </VStack>
    </Box>
  )
}
