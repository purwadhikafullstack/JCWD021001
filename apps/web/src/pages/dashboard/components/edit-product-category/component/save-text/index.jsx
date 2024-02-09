import { Text } from '@chakra-ui/react'
import { editProductCategory } from '../../services/editProductCategory'

export const SaveText = (props) => {
  console.log('save-text', props?.formik.values)
  return (
    <Text
      w={'5em'}
      fontSize={'.75em'}
      fontWeight={'bold'}
      color={'redPure.600'}
      cursor={'pointer'}
      onClick={() => {
        editProductCategory(props?.id, props?.formik.values[`name_${props.id}`], props?.toast)
      }}
    >
      Save
    </Text>
  )
}
