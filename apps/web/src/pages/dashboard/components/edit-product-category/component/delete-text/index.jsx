import { Text } from '@chakra-ui/react'
import { deleteProductCategory } from '../../services/deleteProductCategory'

export const DeleteText = (props) => {
  return (
    <Text
      w={'5em'}
      fontSize={'.75em'}
      fontWeight={'bold'}
      color={'redPure.600'}
      cursor={'pointer'}
      onClick={() => {
        deleteProductCategory(props?.id, null, null, props?.toast)
      }}
    >
      Delete
    </Text>
  )
}
