import { Text } from '@chakra-ui/react'
import { editProductCategory } from '../../services/editProductCategory'

export const SaveGrandParentText = (props) => {
  return (
    <Text
      w={'5em'}
      fontSize={'.75em'}
      fontWeight={'bold'}
      color={'redPure.600'}
      cursor={'pointer'}
      onClick={() => {
        editProductCategory(props?.id, props?.formik.values[`${props.id}`].trim(), props?.toast)
      }}
    >
      Save
    </Text>
  )
}
