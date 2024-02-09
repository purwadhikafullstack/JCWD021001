import { Input, Text } from '@chakra-ui/react'

export const GroupNameInput = (props) => {
  return (
    <Input
      mb={'.3em'}
      type="text"
      id={`name_${props?.id}`}
      name={`name_${props?.id}`}
      onChange={props?.formik.handleChange}
      value={props?.formik.values[`name_${props?.id}`]}
      borderColor={'transparent'}
      focusBorderColor={'transparent'}
      bgColor={'grey.50'}
    />
  )
}

export const CategoryNameInput = (props) => {
  return (
    <Input
      type="text"
      id={`childName_${props?.id}`}
      name={`childName_${props?.id}`}
      onChange={props?.formik.handleChange}
      value={props?.formik.values[`childName_${props?.id}`]}
      borderColor={'transparent'}
      focusBorderColor={'transparent'}
      bgColor={'grey.50'}
    />
  )
}

export const NewProductInput = (props) => {
  return (
    <Input
      mt={'.5em'}
      id={`${props.id}`}
      placeholder={'Input new product categories'}
      borderColor={'transparent'}
      focusBorderColor={'transparent'}
      bgColor={'grey.50'}
      value={props?.findById(props?.id)}
      onFocus={(e) => props?.onFocusInput(props?.id, e.target.value)}
      onBlur={() => {
        props?.setInput([{}])
      }}
      onChange={(e) => {
        props?.handleInput(props?.id, e.target.value)
      }}
    />
  )
}

export const NewGroupInput = (props) => {
  return (
    <>
      <Input
        id={`${props?.genderId}`}
        placeholder={'Input new product group'}
        borderColor={'transparent'}
        focusBorderColor={'transparent'}
        bgColor={'grey.50'}
        value={props?.findById(props?.genderId)}
        onFocus={(e) => props?.onFocusInput(genderId, e.target.value)}
        onBlur={() => {
          props?.setInput([{}])
        }}
        onChange={(e) => {
          props?.handleInput(props?.genderId, e.target.value)
        }}
      />
      <Text fontWeight={'bold'}>New Category</Text>
      <Input
        id={`${props?.genderId}`}
        placeholder={'Input the categories of the group'}
        borderColor={'transparent'}
        focusBorderColor={'transparent'}
        bgColor={'grey.50'}
        onChange={(e) => {
          props?.setNewChildren(e.target.value)
        }}
      />
    </>
  )
}
