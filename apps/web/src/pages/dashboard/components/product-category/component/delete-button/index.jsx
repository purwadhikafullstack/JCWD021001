import { Button } from '@chakra-ui/react'

export const DeleteButton = (props) => {
  return (
    <Button
      _hover={{
        bgColor: 'transparent',
      }}
      fontSize={'.8em'}
      h={'2.5em'}
      w={'5em'}
      border={'1px solid #CD0244'}
      bgColor={'transparent'}
      color={'redPure.600'}
      onClick={() => {
        deleteProductCategory(null, null, props?.id, props?.toast)
      }}
    >
      Delete
    </Button>
  )
}
