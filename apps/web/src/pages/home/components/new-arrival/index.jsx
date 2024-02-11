import { Box, Flex, Image } from '@chakra-ui/react'

function CategorySecond() {
  return (
    <>
      <Flex className="new-arrival" margin={'24px auto'} position={'relative'} width={'95%'}>
        <Box width={'50%'}>
        <Image
              // src={women}
              objectFit={'cover'}
              borderRadius={'12px'}
              height={'100%'}
              width={'100%'}
              opacity={'1'}
              _hover={{ opacity: '0.75' }}
            />
        </Box>
        <Box width={'50%'}>

        </Box>
      </Flex>
    </>
  )
}

export default CategorySecond
