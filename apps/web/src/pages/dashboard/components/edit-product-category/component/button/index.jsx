import { Button, HStack } from '@chakra-ui/react'
import { createProductCategory } from '../../services/createProductCategory'
import { useNavigate } from 'react-router-dom'

export const HandleEditButton = (props) => {
  return (
    <Button
      _hover={{
        bgColor: 'redPure.600',
      }}
      fontSize={'.8em'}
      h={'2.5em'}
      w={'5em'}
      bgColor={'redPure.600'}
      color={'white'}
      onClick={() => props?.handleEditClick(props.id)}
    >
      {props?.editable[props?.id] ? 'Cancel' : 'Add'}
    </Button>
  )
}

export const HandleAddSubmitButton = (props) => {
  return (
    <Button
      _hover={{
        bgColor: 'redPure.600',
      }}
      fontSize={'.8em'}
      h={'2.5em'}
      w={'5em'}
      bgColor={'redPure.600'}
      color={'white'}
      onClick={async () => {
        await createProductCategory(props?.fixInput, props?.id, props?.toast)
        props?.setFixInput('')
      }}
    >
      Submit
    </Button>
  )
}

export const AddNewGroupButton = (props) => {
  return (
    <HStack>
      <Button
        _hover={{
          bgColor: 'redPure.600',
        }}
        fontSize={'.8em'}
        h={'2.5em'}
        w={props?.editable[props?.genderId] ? '5em' : '10em'}
        bgColor={'redPure.600'}
        color={'white'}
        onClick={() => props?.handleEditClick(props?.genderId)}
      >
        {props?.editable[props?.genderId] ? 'Cancel' : 'Add New Group'}
      </Button>
      {props?.editable[props?.genderId] && (
        <Button
          _hover={{
            bgColor: 'redPure.600',
          }}
          fontSize={'.8em'}
          h={'2.5em'}
          w={'5em'}
          bgColor={'redPure.600'}
          color={'white'}
          onClick={async () => {
            try {
              const res = await createProductCategory(
                props?.fixInput,
                props?.genderId,
                props?.toast,
              )
              createProductCategory(props?.newChildren, res?.data?.data?.id, props?.toast)
              props?.setFixInput('')
            } catch (err) {
              throw err
            }
          }}
        >
          Submit
        </Button>
      )}
    </HStack>
  )
}

export const EditableButton = (props) => {
  return (
    <>
      <Button
        _hover={{
          bgColor: 'redPure.600',
        }}
        w={'5em'}
        bgColor={'redPure.600'}
        color={'white'}
        isLoading={false}
        onClick={() => {
          props?.handleEditClickCategory()
        }}
      >
        {!props?.editableCategory ? 'Edit' : 'Cancel'}
      </Button>
    </>
  )
}

export const ViewButton = (props) => {
  const navigate = useNavigate()
  return (
    <Button
      _hover={{
        bgColor: 'redPure.600',
      }}
      fontSize={'.8em'}
      h={'2.5em'}
      w={'5em'}
      bgColor={'redPure.600'}
      color={'white'}
      onClick={() => {
        navigate(`/dashboard/product-category/view-product-category/${props?.name.toLowerCase()}`)
      }}
    >
      View
    </Button>
  )
}
