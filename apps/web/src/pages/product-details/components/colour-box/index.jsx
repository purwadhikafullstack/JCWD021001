import { Box, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const ColourBox = (props) => {
  // Navigate
  const navigate = useNavigate()

  return (
    <Box
      cursor={'pointer'}
      bgColor={props?.colourToggle[props?.id] ? '#ffb1cc' : 'white'}
      p={'.5em'}
      border={props?.colourToggle[props?.id] ? '2px solid #e3024b' : '2px solid #f2f2f2'}
      borderRadius={'.5em'}
      key={props?.index}
      onClick={() => {
        props?.changeColourToggle(props?.id)
      }}
    >
      <VStack spacing={'1em'}>
        <Box
          p={'.5em'}
          bgColor={props?.name}
          w={'2.5em'}
          h={'2.5em'}
          borderRadius={'.5em'}
          onClick={() =>
            navigate(
              `${props?.pathName}?col=${props?.colourToggle[props?.id] ? 0 : props?.id}&sz=${
                props?.sizeValue
              }`,
            )
          }
        ></Box>
        <Text fontWeight={'bold'} fontSize={'.75em'}>
          {props?.name}
        </Text>
      </VStack>
    </Box>
  )
}
