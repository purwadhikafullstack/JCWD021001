import { AspectRatio, Box, Flex, Image } from '@chakra-ui/react'
export const Carousel = (props) => {
  return (
    <Box p={'.5em 0'} w={'100%'}>
      <Flex w={'100%'} justifyContent={'space-between'}>
        {props?.images.map((image, index) => (
          <Box
            w={'30%'}
            overflow={'hidden'}
            borderRadius={'1em'}
            bgColor={'white'}
            key={index}
            onClick={() => props?.handleSelectImage(image)}
            cursor={'pointer'}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <AspectRatio ratio={1}>
              <Image src={image} alt={`Thumbnail ${index}`} objectFit={'cover'} />
            </AspectRatio>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
