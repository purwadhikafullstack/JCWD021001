import { Text } from '@chakra-ui/react'
import { deleteProductCategory } from '../../services/deleteProductCategory'

export const DeleteChildren = (props) => {
  return (
    <Text
      w={'5em'}
      fontSize={'.75em'}
      fontWeight={'bold'}
      color={'redPure.600'}
      cursor={'pointer'}
      onClick={() => {
        deleteProductCategory(props?.id, props.itemId, null, props?.toast)
      }}
    >
      Delete
    </Text>
  )
}
