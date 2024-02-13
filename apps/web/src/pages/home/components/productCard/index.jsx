import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react'
import toRupiah from '@develoka/angka-rupiah-js'
import { useNavigate } from 'react-router-dom'
export const ProductCard = (props) => {
  const navigate = useNavigate()
  const truncateString = (str, maxLength) => {
    if (str.length <= maxLength) {
      return str
    }
    return str.slice(0, maxLength) + '...'
  }

  return (
    <Box
      bgColor={'white'}
      width={{ base: '140px', md: '212px' }}
      flex="0 0 auto"
      h={{ base: '16em', md: '18em' }}
      borderRadius={'.5em'}
      overflow={'hidden'}
      cursor={'pointer'}
      onClick={() => navigate(`/product/${props?.id}/?col=0&sz=0`)}
    >
      <AspectRatio ratio={1}>
        <Image
          src={`${import.meta.env.VITE_APP_API_IMAGE_URL}/productImages/${
            props?.picture[0]?.imageUrl
          }`}
          objectFit={'cover'}
          alt={'Photo Products'}
        />
      </AspectRatio>
      <Box p={'.5em 1em'} h={{ base: '6.5em', sm: '7.3em' }}>
        <Flex
          flexDir={'column'}
          w={'100%'}
          h={'80%'}
          gap={'10px'}
          fontSize={'.85em'}
          fontWeight={'bold'}
        >
          <Text alignItems={'justify'}>{truncateString(props?.name, 20)}</Text>
          <Text>{toRupiah(props?.price)}</Text>
        </Flex>
      </Box>
    </Box>
  )
}
