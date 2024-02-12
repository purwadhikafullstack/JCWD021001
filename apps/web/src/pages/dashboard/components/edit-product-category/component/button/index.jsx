import { Button, HStack, useToast } from '@chakra-ui/react'
import { createProductCategory } from '../../services/createProductCategory'
import { useNavigate } from 'react-router-dom'
import { createSize } from '../../services/createSize'

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
export const HandleEditSizeButton = (props) => {
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
        props?.handleEditClick(props.id)
      }}
    >
      {props?.editable[props?.id] ? 'Cancel' : 'Add Size'}
    </Button>
  )
}

export const HandleAddSubmitButton = (props) => {
  const toast = useToast()
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
        try {
          if (props?.fixInput.trim() === '') {
            throw new Error('Input cannot be empty')
          }
          await createProductCategory(props?.fixInput, props?.id, props?.toast)
          props?.setFixInput('')
        } catch (err) {
          toast({
            title: err?.message,
            status: 'error',
          })
        }
      }}
    >
      Submit
    </Button>
  )
}

export const HandleAddSubmitSizeButton = (props) => {
  const toast = useToast()
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
        try {
          if (props?.fixInput.trim() === '') {
            throw new Error('Input cannot be empty')
          }
          await createSize(props?.fixInput, props?.productCategoryId, props?.toast)
          props?.setFixInput('')
        } catch (err) {
          toast({
            title: err.message,
            status: 'error',
          })
        }
      }}
    >
      Submit
    </Button>
  )
}

export const AddNewGroupButton = (props) => {
  const toast = useToast()
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
              if (res?.data?.message == 'Product Category with that name is already exist') {
                throw new Error('Group with that name already exist')
              }
              if (!res?.data?.data?.id) throw new Error('Canceled')
              await createProductCategory(props?.newChildren, res?.data?.data?.id, props?.toast)
              props?.setFixInput('')
            } catch (err) {
              toast({
                title: err.message,
                status: 'error',
              })
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
