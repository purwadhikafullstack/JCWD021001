import { Button } from '@chakra-ui/react'

export const EditButton = (props) => {
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
        props?.navigate(
          `/dashboard/product-category/edit-product-category/${props?.name.toLowerCase()}`,
        )
      }}
    >
      Edit
    </Button>
  )
}
