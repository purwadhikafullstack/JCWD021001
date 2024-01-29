import { Box, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export const SizeBox = (props) => {
  const navigate = useNavigate()
  return (
    <Box
      cursor={'pointer'}
      bgColor={props?.sizeToggle[props?.id] ? '#ffb1cc' : 'white'}
      p={'.5em'}
      border={props?.sizeToggle[props?.id] ? '2px solid #e3024b' : '2px solid #f2f2f2'}
      borderRadius={'.5em'}
      key={props?.index}
      onClick={() => {
        props?.changeSizeToggle(props?.id)
        navigate(
          `${props?.pathName}?col=${props?.colourValue}&sz=${
            props?.sizeToggle[props?.id] ? 0 : props?.id
          }`,
        )
      }}
    >
      <Text fontWeight={'bold'} fontSize={'.75em'}>
        {props?.name}
      </Text>
    </Box>
  )
}
