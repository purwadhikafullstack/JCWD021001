import { Input } from '@chakra-ui/react'

export const GrandParentInput = (props) => {
  return (
    <Input
      mb={'.3em'}
      type="text"
      id={`${props?.id}`}
      name={`${props?.id}`}
      onChange={props?.formik.handleChange}
      value={props?.formik.values[props?.id]}
      borderColor={'transparent'}
      focusBorderColor={'transparent'}
      bgColor={'grey.50'}
      isReadOnly={!props?.editableCategory}
    />
  )
}
