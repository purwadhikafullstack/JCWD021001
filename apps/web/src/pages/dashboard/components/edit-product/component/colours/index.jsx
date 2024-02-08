import { Box, HStack, Text, VStack } from '@chakra-ui/react'

export const Colours = (props) => {
  const colours = props?.product?.colour?.map((colour, index) => {
    return (
      <Box
        cursor={'pointer'}
        bgColor={'white'}
        p={'.5em'}
        border={'2px solid #f2f2f2'}
        borderRadius={'.5em'}
        key={index}
      >
        <VStack spacing={'1em'}>
          <Box
            p={'.5em'}
            bgColor={colour?.name}
            w={'2.5em'}
            h={'2.5em'}
            borderRadius={'.5em'}
          ></Box>
          <Text fontWeight={'bold'} fontSize={'.75em'}>
            {colour?.name}
          </Text>
        </VStack>
      </Box>
    )
  })
  return <HStack>{colours}</HStack>
}
